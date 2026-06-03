/** @odoo-module */

/**
 * MaximizoTech POS Navbar Patch
 * 
 * Provides custom logo functionality for the POS navbar.
 * Theme color injection has been moved to theme_service.js for earlier execution.
 */

import { Navbar } from "@point_of_sale/app/navbar/navbar";
import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";

patch(Navbar.prototype, {
    setup() {
        super.setup(...arguments);
        // Get theme service to ensure colors are applied
        // (theme service auto-applies on startup, but this ensures it's loaded)
        this.themeService = useService("mx_pos_theme");
    },

    /**
     * Get URL for custom POS logo from pos.config.
     * @returns {string} Image URL for custom logo
     */
    getCustomLogoUrl() {
        const config = this.pos.config;
        const unique = encodeURIComponent(config.write_date || "");
        return `/web/image?model=pos.config&id=${config.id}&field=custom_pos_logo&unique=${unique}`;
    },

    /**
     * Get URL for company logo as fallback.
     * @returns {string} Image URL for company logo
     */
    getCompanyLogoUrl() {
        const company = this.pos.company;
        const unique = encodeURIComponent(company.write_date || "");
        return `/web/image?model=res.company&id=${company.id}&field=logo&unique=${unique}`;
    },
});
