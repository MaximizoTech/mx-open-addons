/** @odoo-module */

import { OrderReceipt } from "@point_of_sale/app/screens/receipt_screen/receipt/order_receipt";
import { patch } from "@web/core/utils/patch";
import { Component, useState, xml } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

/**
 * Patch OrderReceipt to support custom receipt designs.
 * When is_custom_receipt is enabled and a design_receipt XML is set
 * on the pos.config, the custom template is rendered instead.
 */
patch(OrderReceipt.prototype, {
  setup() {
    super.setup();
    this.state = useState({
      template: true,
    });
    this.pos = useService("pos");
  },

  get templateProps() {
    const currentOrder = this.pos.get_order();
    const exportedOrder = currentOrder
      ? currentOrder.export_for_printing()
      : {};
    return {
      data: this.props.data || {},
      order: currentOrder,
      receipt: exportedOrder,
      orderlines: this.props.data?.orderlines || [],
      paymentlines:
        this.props.data?.paymentlines || exportedOrder.paymentlines || [],
    };
  },

  get templateComponent() {
    const mainRef = this;
    return class extends Component {
      static props = { "*": true };
      static template = xml`${mainRef.pos.config.design_receipt || "<div class='pos-receipt'/>"}`;
    };
  },

  get isTrue() {
    return Boolean(
      this.env.services.pos.config.is_custom_receipt &&
      this.pos.config.design_receipt,
    );
  },
});
