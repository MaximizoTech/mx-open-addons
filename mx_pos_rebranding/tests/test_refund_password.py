# -*- coding: utf-8 -*-
"""
Unit tests for the MaximizoTech refund password feature.

These tests ensure the refund password security mechanism works correctly:
- Password field exists on pos.config model
- Password is included in POS UI data when set
- Default behavior allows refunds without password
"""

from odoo.tests import tagged, TransactionCase


@tagged('post_install', '-at_install', 'pos_rebranding')
class TestRefundPassword(TransactionCase):
    """Test cases for refund password security feature."""

    @classmethod
    def setUpClass(cls):
        """Set up test data."""
        super().setUpClass()
        cls.pos_config = cls.env['pos.config'].create({
            'name': 'MaximizoTech Test POS',
            'module_pos_restaurant': False,
        })

    def test_refund_password_field_exists(self):
        """Test that refund_password field exists on pos.config model."""
        self.assertIn(
            'refund_password',
            self.env['pos.config']._fields,
            "refund_password field should exist on pos.config model"
        )
        
        # Verify field type and properties
        field = self.env['pos.config']._fields['refund_password']
        self.assertEqual(field.type, 'char', "refund_password should be a Char field")

    def test_refund_password_default_empty(self):
        """Test that refund password is empty by default (allows refunds without gate)."""
        self.assertFalse(
            self.pos_config.refund_password,
            "refund_password should be empty/False by default"
        )

    def test_refund_password_can_be_set(self):
        """Test that refund password can be set and retrieved correctly."""
        test_password = "1234"
        
        self.pos_config.refund_password = test_password
        
        self.assertEqual(
            self.pos_config.refund_password,
            test_password,
            "refund_password should match the set value"
        )

    def test_refund_password_in_pos_session_data(self):
        """Test that refund password is included in POS frontend data."""
        test_password = "secure123"
        self.pos_config.refund_password = test_password
        
        # Create a POS session to test data loading
        session = self.env['pos.session'].create({
            'config_id': self.pos_config.id,
            'user_id': self.env.uid,
        })
        
        try:
            # The config should have the password available for frontend
            self.assertEqual(
                session.config_id.refund_password,
                test_password,
                "POS session config should include refund_password"
            )
        finally:
            # Clean up: close session
            session.action_pos_session_closing_control()

    def test_theme_color_fields_exist(self):
        """Test that theme color fields exist on pos.config model."""
        expected_fields = [
            'theme_accent_color',
            'theme_bg_color',
            'theme_surface_color',
            'theme_text_color',
        ]
        
        for field_name in expected_fields:
            self.assertIn(
                field_name,
                self.env['pos.config']._fields,
                f"{field_name} field should exist on pos.config model"
            )

    def test_theme_color_defaults(self):
        """Test that theme colors have proper default values."""
        # Create a fresh config to test defaults
        config = self.env['pos.config'].create({
            'name': 'Theme Test POS',
        })
        
        # Verify default values match those in pos_config.py
        self.assertEqual(
            config.theme_accent_color,
            '#d4a24e',
            "theme_accent_color should have correct default"
        )
        self.assertEqual(
            config.theme_bg_color,
            '#1b1410',
            "theme_bg_color should have correct default"
        )
        self.assertEqual(
            config.idle_screen_text,
            'MAXIMIZOTECH',
            "idle_screen_text should default to MAXIMIZOTECH"
        )
