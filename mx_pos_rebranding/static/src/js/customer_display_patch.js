/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { session } from "@web/session";
import { CustomerDisplay } from "@point_of_sale/customer_display/customer_display";

/**
 * Patch CustomerDisplay to support MaximizoTech custom branding.
 * Provides a brandLogo getter that returns the custom POS logo URL
 * when configured, allowing the customer display to show custom branding.
 */
patch(CustomerDisplay.prototype, {
    /**
     * Get the custom brand logo URL for the customer display.
     * Falls back to company logo if no custom logo is set.
     */
    get brandLogo() {
        // Check if custom_pos_logo is set (passed via _get_customer_display_data)
        // session here is the global session object populated by the controller
        if (session?.custom_pos_logo && session?.config_id) {
            return `/web/image?model=pos.config&id=${session.config_id}&field=custom_pos_logo`;
        }
        
        // Fallback to standard company logo URL
        if (session?.company_id) {
            return `/logo?company=${session.company_id}`;
        }
        
        // If component has this.session (from setup), use that
        if (this.session?.custom_pos_logo && this.session?.config_id) {
            return `/web/image?model=pos.config&id=${this.session.config_id}&field=custom_pos_logo`;
        }
        
        if (this.session?.company_id) {
            return `/logo?company=${this.session.company_id}`;
        }
        
        return false;
    },
});

