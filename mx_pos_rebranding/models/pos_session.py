from odoo import models


class PosSession(models.Model):
    """Extend pos.session to load custom receipt designs into the POS frontend."""
    _inherit = "pos.session"

    def _loader_params_pos_receipt(self):
        """Return search params for loading pos.receipt records into POS."""
        return {
            "search_params": {
                "fields": ["design_receipt", "name"],
            },
        }

    def _get_pos_ui_pos_receipt(self, params):
        """Fetch pos.receipt records for the POS frontend."""
        return self.env["pos.receipt"].search_read(**params["search_params"])
