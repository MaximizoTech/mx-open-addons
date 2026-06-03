{
    "name": "POS Rebranding",
    "version": "18.0.3.3.0",
    "category": "Point of Sale",
    "summary": "All-in-one POS customization: branding, theme, refund security, orderline management, custom receipts",
    "description": """
        MaximizoTech Module
        ============================
        - Upload a custom logo per POS configuration (replaces default Odoo logo).
        - Customer display branding (logo + hide "Powered by Odoo").
        - Configurable theme with HTML5 color pickers in settings.
        - Smart text contrast detection for readable text on all backgrounds.
        - Refund password protection on the Ticket Screen.
        - Per-orderline X delete button and Clear All functionality.
        - Custom receipt design templates.
        - Browser tab title changed to MAXIMIZOTECH.
        - Idle screen branded with MAXIMIZOTECH text.
        
        Performance optimized with split CSS (critical/deferred).
        See doc/PERFORMANCE.md for technical details.
        
        v18.0.3.3.0 Changes:
        - Smart text contrast: Text colors auto-adjust based on background luminance
        - Fresh installs start with no colors (uses Odoo defaults)
        - Clear button properly resets colors to default
    """,
    "author": "MaximizoTech",
    "website": "https://maximizotech.com",
    "support": "contact@maximizotech.com",
    "depends": [
        "point_of_sale",
    ],
    "data": [
        "security/ir.model.access.csv",
        "views/res_config_settings_views.xml",
        "views/pos_assets_index.xml",
        "views/pos_receipt_views.xml",
        "views/pos_config_views.xml",
        "data/pos_receipt_design1_data.xml",
        "data/pos_receipt_design2_data.xml",
        "data/ir_config_parameter.xml"
    ],
    "assets": {
        "web.assets_backend": [
            "mx_pos_rebranding/static/src/js/hex_color_widget.js",
        ],
        "point_of_sale._assets_pos": [
            # Critical CSS: Sections 1-8 (above-the-fold: root, navbar, products, numpad, pay)
            "mx_pos_rebranding/static/src/scss/pos_theme_critical.scss",
            # Deferred CSS: Sections 9-23 (below-the-fold: modals, receipts, animations)
            "mx_pos_rebranding/static/src/scss/pos_theme_deferred.scss",
            # Theme service must load before other JS to inject CSS vars early
            "mx_pos_rebranding/static/src/js/theme_service.js",
            "mx_pos_rebranding/static/src/js/navbar_patch.js",
            "mx_pos_rebranding/static/src/js/ticket_screen_patch.js",
            "mx_pos_rebranding/static/src/js/orderline_delete_patch.js",
            "mx_pos_rebranding/static/src/js/receipt_design_patch.js",
            "mx_pos_rebranding/static/src/xml/navbar_logo.xml",
            "mx_pos_rebranding/static/src/xml/saver_screen.xml",
            "mx_pos_rebranding/static/src/xml/orderline_delete.xml",
            "mx_pos_rebranding/static/src/xml/order_receipt.xml",
        ],
        # Customer display branding (separate bundle for customer-facing screen)
        "point_of_sale.customer_display_assets": [
            "mx_pos_rebranding/static/src/js/customer_display_patch.js",
            "mx_pos_rebranding/static/src/xml/customer_display.xml",
        ],
    },
    "license": "LGPL-3",
    "installable": True,
    "application": True,
    "auto_install": False,
}
