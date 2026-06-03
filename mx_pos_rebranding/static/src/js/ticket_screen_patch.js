/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { TicketScreen } from "@point_of_sale/app/screens/ticket_screen/ticket_screen";
import { NumberPopup } from "@point_of_sale/app/utils/input_popups/number_popup";
import { _t } from "@web/core/l10n/translation";
import { useService } from "@web/core/utils/hooks";

/**
 * Gate the Ticket Screen refund action behind a configurable password.
 * Password is set in: Settings -> POS -> MaximizoTech Custom UI -> Refund Password
 * If no password is configured, refunds proceed without a gate.
 */
patch(TicketScreen.prototype, {
  setup() {
    super.setup(...arguments);
    this.notification = useService("notification");
  },

  async onDoRefund() {
    const refundPassword = this.pos.config.refund_password;

    // No password configured -> allow refund immediately
    if (!refundPassword) {
      return super.onDoRefund(...arguments);
    }

    // Show password popup - arrow function inherits `super` from this method
    this.dialog.add(NumberPopup, {
      title: _t("Refund Authorization"),
      placeholder: _t("Enter refund password"),
      formatDisplayedValue: (input) => input.replace(/./g, "*"),
      getPayload: (inputPassword) => {
        if (String(inputPassword) === String(refundPassword)) {
          // Correct -> proceed with refund
          super.onDoRefund();
        } else {
          // Wrong -> show warning
          this.notification.add(_t("Incorrect refund password."), {
            type: "warning",
            title: _t("Access Denied"),
          });
        }
      },
    });
  },
});
