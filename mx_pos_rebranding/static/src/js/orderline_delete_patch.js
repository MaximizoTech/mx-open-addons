/** @odoo-module */

import { patch } from "@web/core/utils/patch";
import { Orderline } from "@point_of_sale/app/generic_components/orderline/orderline";
import { ControlButtons } from "@point_of_sale/app/screens/product_screen/control_buttons/control_buttons";
import { ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";
import { _t } from "@web/core/l10n/translation";
import { useService } from "@web/core/utils/hooks";
import { usePos } from "@point_of_sale/app/store/pos_hook";

/**
 * Add per-line X button to remove individual order lines.
 */
patch(Orderline.prototype, {
  setup() {
    super.setup();
    this.pos = usePos();
    this.numberBuffer = useService("number_buffer");
  },

  /**
   * Remove this orderline by sending Backspace twice to the number buffer.
   */
  async clear_button_fun(ev) {
    this.numberBuffer.sendKey("Backspace");
    this.numberBuffer.sendKey("Backspace");
  },
});

/**
 * Add "Clear All" button to control buttons area.
 */
patch(ControlButtons.prototype, {
  async onClearLines() {
    const order = this.pos.get_order();
    const lines = order.get_orderlines();
    if (lines.length) {
      this.dialog.add(ConfirmationDialog, {
        title: _t("Clear Orders?"),
        body: _t("Are you sure you want to delete all items from the cart?"),
        confirm: () => {
          lines
            .filter((line) => line.get_product())
            .forEach((line) => order.removeOrderline(line));
        },
        confirmLabel: _t("Clear"),
        cancel: () => {},
        cancelLabel: _t("Cancel"),
      });
    } else {
      this.notification.add(_t("No items to remove."), { type: "danger" });
    }
  },
});
