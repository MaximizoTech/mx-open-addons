# -*- coding: utf-8 -*-
# Copyright (C) MaximizoTech.
# This software is released under the GNU LGPL-3.0 License.
# See the LICENSE file for full copyright and licensing details.

from odoo import fields, models


class ResConfigSettings(models.TransientModel):
    _inherit = "res.config.settings"

    pos_custom_pos_logo = fields.Image(
        string="Custom POS Logo",
        related="pos_config_id.custom_pos_logo",
        readonly=False,
    )
    pos_theme_accent_color = fields.Char(
        string="Accent Color",
        related="pos_config_id.theme_accent_color",
        readonly=False,
    )
    pos_theme_bg_color = fields.Char(
        string="Background Color",
        related="pos_config_id.theme_bg_color",
        readonly=False,
    )
    pos_theme_surface_color = fields.Char(
        string="Surface Color",
        related="pos_config_id.theme_surface_color",
        readonly=False,
    )
    pos_theme_text_color = fields.Char(
        string="Text Color",
        related="pos_config_id.theme_text_color",
        readonly=False,
    )
    pos_refund_password = fields.Char(
        string="Refund Password",
        related="pos_config_id.refund_password",
        readonly=False,
    )
    pos_idle_screen_text = fields.Char(
        string="Idle Screen Text",
        related="pos_config_id.idle_screen_text",
        readonly=False,
    )
