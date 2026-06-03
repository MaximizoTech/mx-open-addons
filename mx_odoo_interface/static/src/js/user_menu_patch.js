/** @odoo-module **/

import { UserMenu } from "@web/webclient/user_menu/user_menu";
import { patch } from "@web/core/utils/patch";
import { registry } from "@web/core/registry";

const userMenuRegistry = registry.category("user_menuitems");

/**
 * Patch UserMenu to remove unwanted menu items
 * Removes: Documentation, Support, Shortcuts, Odoo Account, Install PWA
 */
patch(UserMenu.prototype, {
    setup() {
        super.setup();
        
        // Remove menu items that expose Odoo branding or unnecessary features
        userMenuRegistry.remove("documentation");
        userMenuRegistry.remove("support");
        userMenuRegistry.remove("shortcuts");
        userMenuRegistry.remove("web_tour.tour_enabled");
        userMenuRegistry.remove("separator");
        userMenuRegistry.remove("odoo_account");
        userMenuRegistry.remove("install_pwa");
    }
});
