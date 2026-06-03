# -*- coding: utf-8 -*-
# Copyright (C) MaximizoTech.
# This software is released under the GNU LGPL-3.0 License.
# See the LICENSE file for full copyright and licensing details.

from odoo import fields, models


class PosConfig(models.Model):
    _inherit = "pos.config"

    custom_pos_logo = fields.Image(
        string="Custom POS Logo",
        max_width=1024,
        max_height=1024,
        help="Upload a custom logo to replace the default Odoo logo in the POS interface.",
    )

    # Theme color fields - No defaults, falls back to Odoo default colors
    theme_accent_color = fields.Char(
        string="Accent Color",
        help="Primary brand/accent color (hex). Leave empty for default Odoo purple.",
    )
    theme_bg_color = fields.Char(
        string="Background Color",
        help="Main background color (hex). Leave empty for default light gray.",
    )
    theme_surface_color = fields.Char(
        string="Surface Color",
        help="Panel/card surface color (hex). Leave empty for default white.",
    )
    theme_text_color = fields.Char(
        string="Text Color",
        help="Primary text color (hex). Leave empty for default dark gray.",
    )

    # Refund password
    refund_password = fields.Char(
        string="Refund Password",
        help="If set, cashiers must enter this password before processing a refund on the Ticket Screen.",
    )

    # Idle Screen
    idle_screen_text = fields.Char(
        string="Idle Screen Text",
        default="MAXIMIZOTECH",
        help="Text to display in the center of the idle/saver screen.",
    )

    # Custom receipt design fields
    receipt_design_id = fields.Many2one(
        "pos.receipt",
        string="Receipt Design",
        help="Choose a custom receipt design for this POS.",
    )
    design_receipt = fields.Text(
        related="receipt_design_id.design_receipt",
        string="Receipt XML",
    )
    is_custom_receipt = fields.Boolean(
        string="Use Custom Receipt",
        help="Enable to use a custom receipt template instead of the default.",
    )

    def _get_customer_display_data(self):
        """Override to include custom branding data for customer display."""
        result = super()._get_customer_display_data()
        result['custom_pos_logo'] = bool(self.custom_pos_logo)
        return result
