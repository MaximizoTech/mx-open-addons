# -*- coding: utf-8 -*-
# Copyright (C) MaximizoTech.
# This software is released under the GNU LGPL-3.0 License.
# See the LICENSE file for full copyright and licensing details.

from odoo import api, fields, models


class ResUsers(models.Model):
    """
    Extended res.users model to handle hiding specific menu items per user.
    """
    _inherit = 'res.users'

    hide_menu_ids = fields.Many2many(
        'ir.ui.menu',
        string="Hidden Menu",
        store=True,
        help='Select menu items that should be hidden from this user.')

    is_admin = fields.Boolean(
        compute='_compute_is_admin',
        string="Is Admin",
        help='Check if the user is the main admin user.')

    is_show_specific_menu = fields.Boolean(
        string='Show Hide Menu Tab',
        compute='_compute_is_show_specific_menu',
        help='Determines whether to show the hide specific menu tab')

    def _compute_is_admin(self):
        """
        Check if the user is the admin user.
        Hide menu configuration is hidden for admin.
        """
        admin_user = self.env.ref('base.user_admin', raise_if_not_found=False)
        admin_id = admin_user.id if admin_user else False
        for rec in self:
            rec.is_admin = (rec.id == admin_id)

    @api.depends('groups_id')
    def _compute_is_show_specific_menu(self):
        """
        Determine if the hide menu tab should be shown.
        Only shown for users with internal user access.
        """
        internal_user_group = self.env.ref('base.group_user', raise_if_not_found=False)
        for rec in self:
            if internal_user_group and internal_user_group in rec.groups_id:
                rec.is_show_specific_menu = False
            else:
                # Clear menu restrictions for non-internal users
                if rec.hide_menu_ids:
                    for menu in rec.hide_menu_ids:
                        menu.sudo().write({'restrict_user_ids': [(3, rec.id)]})
                    rec.hide_menu_ids = [(5, 0, 0)]
                rec.is_show_specific_menu = True

    def write(self, vals):
        """
        Override write to sync hide_menu_ids with restrict_user_ids on menus.
        """
        # Store old hidden menus per user
        old_hide_menu_map = {user.id: user.hide_menu_ids for user in self}

        res = super().write(vals)

        if 'hide_menu_ids' in vals:
            for user in self:
                old_menus = old_hide_menu_map.get(user.id, self.env['ir.ui.menu'])

                # Add user to newly hidden menus
                new_menus = user.hide_menu_ids - old_menus
                for menu in new_menus:
                    menu.sudo().write({'restrict_user_ids': [(4, user.id)]})

                # Remove user from menus no longer hidden
                removed_menus = old_menus - user.hide_menu_ids
                for menu in removed_menus:
                    menu.sudo().write({'restrict_user_ids': [(3, user.id)]})

        return res


class IrUiMenu(models.Model):
    """
    Extended ir.ui.menu model to support per-user menu restrictions.
    """
    _inherit = 'ir.ui.menu'

    restrict_user_ids = fields.Many2many(
        'res.users',
        string="Restricted Users",
        help='Users who cannot see this menu item.')

    @api.returns('self')
    def _filter_visible_menus(self):
        """
        Override to filter out menus restricted for the current user.
        System admins can see all menus.
        """
        menus = super()._filter_visible_menus()

        # System admins always see everything
        if self.env.user.has_group('base.group_system'):
            return menus

        # Filter out menus restricted for current user
        return menus.filtered(lambda m: self.env.user not in m.restrict_user_ids)
