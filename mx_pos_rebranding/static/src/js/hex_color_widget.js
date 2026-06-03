/** @odoo-module */

import { registry } from "@web/core/registry";
import { standardFieldProps } from "@web/views/fields/standard_field_props";
import { Component, useState, xml } from "@odoo/owl";

/**
 * A simple HTML5 color picker widget for Char fields.
 * Stores hex values like #ff5500 directly into the field.
 */
class HexColorField extends Component {
  static template = xml`
        <div class="d-flex align-items-center" style="white-space: nowrap;">
            <!-- Circular Color Picker -->
            <div style="position: relative; width: 32px; height: 32px; border-radius: 50%; border: 1px solid #ced4da; box-shadow: 0 1px 3px rgba(0,0,0,0.1); overflow: hidden; cursor: pointer; flex-shrink: 0; margin-right: 8px;" t-att-title="props.placeholder || 'Choose your color'">
                <input type="color"
                       t-att-value="hexValue"
                       t-on-input="onColorChange"
                       t-att-disabled="props.readonly"
                       style="position: absolute; top: -10px; left: -10px; width: 60px; height: 60px; border: none; padding: 0; cursor: pointer;"/>
            </div>
            
            <!-- Hexadecimal Text Input -->
            <input type="text"
                   t-att-value="textValue"
                   t-on-change="onTextChange"
                   t-att-disabled="props.readonly"
                   class="form-control form-control-sm"
                   style="width: 85px; font-family: monospace; padding: 4px;"
                   t-att-placeholder="props.placeholder || '#000000'"/>

            <!-- Reset/Clear Button -->
            <button t-if="textValue" 
                    t-on-click="onClearClicked" 
                    class="btn btn-sm btn-link text-danger p-1 ms-1" 
                    style="text-decoration: none;" 
                    title="Reset to default Odoo color">
                <i class="fa fa-times"></i>
            </button>
        </div>
    `;

  static props = {
    ...standardFieldProps,
    placeholder: { type: String, optional: true },
  };

  get hexValue() {
    return this.props.record.data[this.props.name] || "#ffffff";
  }

  get textValue() {
    return this.props.record.data[this.props.name] || "";
  }

  onClearClicked() {
    if (this.props.readonly) return;
    this.props.record.update({ [this.props.name]: false });
  }

  onColorChange(ev) {
    this.props.record.update({ [this.props.name]: ev.target.value });
  }

  onTextChange(ev) {
    let val = ev.target.value.trim();
    if (val && !val.startsWith("#")) val = "#" + val;
    if (/^#[0-9a-fA-F]{6}$/.test(val)) {
      this.props.record.update({ [this.props.name]: val });
    }
  }
}

export const hexColorField = {
  component: HexColorField,
  supportedTypes: ["char"],
  extractProps: ({ attrs }) => ({
    placeholder: attrs.placeholder,
  }),
};

registry.category("fields").add("hex_color", hexColorField);
