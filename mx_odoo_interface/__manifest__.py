# -*- coding: utf-8 -*-
#############################################################################
#
#    MaximizoTech
#
#    Copyright (C) 2025 MaximizoTech (<https://maximizotech.com>)
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Lesser General Public License as published
#    by the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Lesser General Public License for more details.
#
#    You should have received a copy of the GNU Lesser General Public License
#    along with this program.  If not, see <https://www.gnu.org/licenses/>.
#
#############################################################################

{
    'name': 'Odoo Branding & Menu Manager',
    'version': '18.0.1.0.0',
    'category': 'Tools',
    'summary': 'Remove Odoo branding, hide user menu items, and control menu visibility per user',
    'description': """
Odoo Branding & Menu Manager
=============================

A comprehensive interface customization tool by MaximizoTech that provides three powerful features:

**1. Remove Odoo Branding**
    • Hide "Powered by Odoo" from login page
    • Remove "Manage Databases" link (optional)
    • Clean, professional login experience

**2. Hide User Menu Items**
    • Remove Documentation link
    • Remove Support link
    • Remove Shortcuts menu
    • Remove Odoo Account link
    • Remove Install PWA option
    • Streamlined top-right user menu

**3. Control Menu Visibility Per User**
    • Hide specific menu items for individual users
    • Prevent access without removing the module
    • Perfect for limiting non-admin user interface
    • System admins always see all menus
    • Easy configuration from user form view

**Key Benefits:**
    • Professional, branded interface
    • Cleaner user experience
    • Better user access control
    • No code modifications required
    • Works seamlessly with Odoo 18

**Use Cases:**
    • White-label Odoo deployments
    • Client-specific deployments
    • Limiting interface complexity for end users
    • Custom branding requirements
    • User-specific menu restrictions

Developed by MaximizoTech - Custom ERP Solutions
    """,
    'author': 'MaximizoTech',
    'website': 'https://maximizotech.com',
    'support': 'contact@maximizotech.com',
    'license': 'LGPL-3',
    'depends': ['base', 'web'],
    'data': [
        'security/ir.model.access.csv',
        'views/login_templates.xml',
        'views/res_users_views.xml',
    ],
    'assets': {
        'web.assets_backend': [
            'mx_odoo_interface/static/src/js/user_menu_patch.js',
        ],
    },
    'images': ['static/description/banner.png', 'static/description/icon.png'],
    'application': True,
    'installable': True,
    'auto_install': False,
}
