from odoo import fields, models


class PosReceipt(models.Model):
    """Custom receipt design templates for POS."""
    _name = "pos.receipt"
    _description = "POS Receipt Design"

    name = fields.Char(string="Name", required=True, help="Name of the receipt design")
    design_receipt = fields.Text(
        string="Receipt XML",
        help="OWL XML template for the custom receipt design.",
    )
