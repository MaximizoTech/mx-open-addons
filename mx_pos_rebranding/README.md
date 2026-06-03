# Odoo POS Rebranding & Customization

[![Odoo Version](https://img.shields.io/badge/Odoo-18.0-blue.svg)](https://www.odoo.com/)
[![License: LGPL-3](https://img.shields.io/badge/License-LGPL--3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)
[![Author](https://img.shields.io/badge/Author-MaximizoTech-orange.svg)](https://maximizotech.com)

![Banner](static/description/banner.png)

## Overview

**POS Rebranding** by **MaximizoTech** is a powerful all-in-one Point of Sale customization module designed for Odoo 18. It allows you to fully white-label your POS interface, protect refund operations, customize the receipt layout, and adjust the UI theme colors via a user-friendly interface.

## 🌟 Key Features

### 🎨 Fully Custom Theme & Branding
- **Custom POS Logo:** Upload your own logo per POS configuration (completely replaces the default Odoo logo).
- **Customer Display Branding:** Replaces Odoo branding on the customer-facing screen.
- **Theme Color Picker:** Built-in HTML5 color pickers in the POS settings let you adjust the background and accent colors.
- **Smart Text Contrast:** Automatically adjusts text colors to maintain readability across light and dark backgrounds.
- **Idle Screen & Browser Tab:** Replaces the idle screen and browser tab title with a professional, generic setup.

### 🛡️ Enhanced POS Security & Usability
- **Refund Password Protection:** Secure refund operations directly on the ticket screen.
- **Orderline Management:** Adds an intuitive "X" delete button for single items and a "Clear All" functionality to wipe the cart instantly.

### 🧾 Receipt Customization
- **Custom Receipt Templates:** Choose from beautifully designed, customized receipt layouts built directly into the POS config.

## 🚀 Installation

1. Place the `mx_pos_rebranding` module folder into your Odoo `custom_addons` directory (or whichever directory you use for third-party modules).
2. Restart your Odoo server.
3. Activate **Developer Mode**.
4. Go to **Apps**, click **Update Apps List**, and search for **POS Rebranding**.
5. Click **Install**.

## ⚙️ Configuration

1. Navigate to **Point of Sale → Configuration → Settings**.
2. Select your target Point of Sale.
3. Scroll down to the **Rebranding & Customization** section:
   - **Upload Logo:** Select your brand's logo.
   - **Theme Colors:** Use the color picker to set your primary/background colors.
   - **Receipt Template:** Select your preferred custom receipt layout.
   - **Refund Password:** Set a secure password to restrict refunds.
4. Save the configuration and open a new POS session!

## 💻 Technical Highlights

- **Performance Optimized:** CSS is split into critical (above-the-fold) and deferred sections to ensure blazing-fast POS load times.
- **Dynamic CSS Injection:** Theme variables are cleanly injected at runtime.
- **Supported Version:** Odoo 18.0.

## 🤝 Support & Services

Professionally developed and maintained by **MaximizoTech**. 

For technical support, feature requests, or enterprise Odoo services, please contact us:
- **Website:** [https://maximizotech.com](https://maximizotech.com)
- **Email:** contact@maximizotech.com
- **Author:** MaximizoTech

---
*Authorized and published by MaximizoTech. All rights reserved.*


*Built and maintained by MaximizoTech. Portions inspired by open-source Odoo community tools.*
