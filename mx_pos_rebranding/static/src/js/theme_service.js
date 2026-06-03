/** @odoo-module */

/**
 * MaximizoTech POS Theme Service
 * 
 * Injects CSS custom properties for theming as early as possible in the
 * POS lifecycle. This service runs when POS loads, before most components
 * mount, ensuring theme colors are available for the idle screen and all
 * other components.
 * 
 * Features smart text contrast detection to ensure readability on all backgrounds.
 */

import { registry } from "@web/core/registry";

// ═══════════════════════════════════════════════════════════════════════
// Color Utility Functions
// ═══════════════════════════════════════════════════════════════════════

/**
 * Validate a hex color string.
 * @param {string} hex - Color string to validate
 * @returns {boolean} True if valid hex color
 */
function isValidHex(hex) {
    if (!hex || typeof hex !== "string") return false;
    const clean = hex.replace("#", "");
    return /^[0-9a-fA-F]{3}$|^[0-9a-fA-F]{6}$/.test(clean);
}

/**
 * Normalize a hex color to 6-digit format.
 * @param {string} hex - Hex color (3 or 6 digits, with or without #)
 * @returns {string} Normalized hex color with #
 */
function normalizeHex(hex) {
    if (!hex) return null;
    let clean = hex.replace("#", "");
    if (clean.length === 3) {
        clean = clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2];
    }
    return "#" + clean.toLowerCase();
}

/**
 * Convert hex color to RGB components.
 * @param {string} hex - Hex color string
 * @returns {number[]} Array of [r, g, b] values (0-255)
 */
function hexToRgb(hex) {
    const clean = hex.replace("#", "");
    const expanded = clean.length === 3
        ? clean[0] + clean[0] + clean[1] + clean[1] + clean[2] + clean[2]
        : clean;
    const num = parseInt(expanded, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

/**
 * Create rgba() color string from hex + alpha.
 * @param {string} hex - Hex color
 * @param {number} alpha - Alpha value (0-1)
 * @returns {string} rgba() color string
 */
function hexAlpha(hex, alpha) {
    const [r, g, b] = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Mix two hex colors at a given ratio.
 * @param {string} c1 - First hex color
 * @param {string} c2 - Second hex color
 * @param {number} ratio - Mix ratio (0 = all c2, 1 = all c1)
 * @returns {string} rgb() color string
 */
function mixHex(c1, c2, ratio) {
    const [r1, g1, b1] = hexToRgb(c1);
    const [r2, g2, b2] = hexToRgb(c2);
    const r = Math.round(r1 * ratio + r2 * (1 - ratio));
    const g = Math.round(g1 * ratio + g2 * (1 - ratio));
    const b = Math.round(b1 * ratio + b2 * (1 - ratio));
    return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Calculate relative luminance of a color (WCAG formula).
 * @param {number[]} rgb - Array of [r, g, b] values (0-255)
 * @returns {number} Luminance value (0-1)
 */
function getLuminance(rgb) {
    const [r, g, b] = rgb.map(c => {
        c = c / 255;
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Check if a background color is "light" (needs dark text).
 * @param {string} hex - Background hex color
 * @returns {boolean} True if background is light
 */
function isLightBackground(hex) {
    const rgb = hexToRgb(hex);
    return getLuminance(rgb) > 0.4;
}

/**
 * Get the best contrasting text color for a given background.
 * @param {string} bgHex - Background hex color
 * @param {string} lightText - Light text color (for dark backgrounds)
 * @param {string} darkText - Dark text color (for light backgrounds)
 * @returns {string} The text color with better contrast
 */
function getContrastingText(bgHex, lightText, darkText) {
    return isLightBackground(bgHex) ? darkText : lightText;
}

// ═══════════════════════════════════════════════════════════════════════
// Theme Service
// ═══════════════════════════════════════════════════════════════════════

/**
 * Inject all theme CSS custom properties into the document root.
 * @param {Object} config - pos.config object with theme fields
 */
export function injectThemeColors(config) {
    const root = document.documentElement;
    if (!root || !config) return;

    // Default Odoo colors (used if no custom colors are set)
    const defaults = {
        accent: "#714B67",
        bg: "#f0eeee",
        surface: "#ffffff",
        text: "#495057",
    };

    // Get and validate colors from config, falling back to defaults
    const accent = (isValidHex(config.theme_accent_color) 
        ? normalizeHex(config.theme_accent_color) 
        : defaults.accent);
    const bg = (isValidHex(config.theme_bg_color) 
        ? normalizeHex(config.theme_bg_color) 
        : defaults.bg);
    const surface = (isValidHex(config.theme_surface_color) 
        ? normalizeHex(config.theme_surface_color) 
        : defaults.surface);
    const text = (isValidHex(config.theme_text_color) 
        ? normalizeHex(config.theme_text_color) 
        : defaults.text);

    // ── Core 4 (from settings) ──
    root.style.setProperty("--mt-accent", accent);
    root.style.setProperty("--mt-bg", bg);
    root.style.setProperty("--mt-surface", surface);
    root.style.setProperty("--mt-text", text);

    // ── Odoo's idle screen variable ──
    root.style.setProperty("--homeMenu-bg-color", bg);

    // ── Derived from accent ──
    const accentLight = mixHex(accent, "#ffffff", 0.65);
    const accentDeep = mixHex(accent, "#000000", 0.75);
    root.style.setProperty("--mt-accent-light", accentLight);
    root.style.setProperty("--mt-accent-deep", accentDeep);

    // ── Derived from surface ──
    const elevated = mixHex(surface, "#ffffff", 0.8);
    root.style.setProperty("--mt-elevated", elevated);

    // ── Derived from text + bg ──
    root.style.setProperty("--mt-text-muted", mixHex(text, bg, 0.5));
    root.style.setProperty("--mt-text-secondary", mixHex(text, bg, 0.7));

    // ══════════════════════════════════════════════════════════════════
    // SMART CONTRAST TEXT COLORS
    // These colors automatically switch based on background luminance.
    // Use --mt-text-on-X instead of --mt-text when the background is X.
    // ══════════════════════════════════════════════════════════════════
    
    const darkFallback = "#1a1a1a";  // Dark text for light backgrounds
    const lightFallback = "#f5f5f5"; // Light text for dark backgrounds

    // Text color for use on elevated/surface backgrounds (cards, panels)
    root.style.setProperty("--mt-text-on-surface", 
        getContrastingText(surface, text, darkFallback));
    
    // Text color for use on hover states (which often lighten)
    root.style.setProperty("--mt-text-on-elevated", 
        getContrastingText(elevated, text, darkFallback));
    
    // Text color for use on accent backgrounds (primary buttons)
    root.style.setProperty("--mt-text-on-accent", 
        getContrastingText(accent, lightFallback, darkFallback));
    
    // Text color for use on accent-light backgrounds (hover states on accent)
    root.style.setProperty("--mt-text-on-accent-light", 
        getContrastingText(accentLight, lightFallback, darkFallback));

    // Text color for use on main background
    root.style.setProperty("--mt-text-on-bg", 
        getContrastingText(bg, lightFallback, darkFallback));

    // ── Borders & cards – text color with alpha transparency ──
    root.style.setProperty("--mt-border", hexAlpha(text, 0.1));
    root.style.setProperty("--mt-border-hover", hexAlpha(text, 0.22));
    root.style.setProperty("--mt-glass-border", hexAlpha(text, 0.12));
    root.style.setProperty("--mt-card-bg", hexAlpha(text, 0.06));
    root.style.setProperty("--mt-card-hover-bg", hexAlpha(text, 0.1));

    // ── Status colors ──
    root.style.setProperty("--mt-success", mixHex(accent, "#4caf50", 0.3));
    root.style.setProperty("--mt-danger", mixHex(accent, "#e53935", 0.15));

    // ── Shadows based on bg color ──
    const shadowBase = hexAlpha(bg, 0.45);
    root.style.setProperty("--mt-shadow-sm", `0 1px 4px ${shadowBase}`);
    root.style.setProperty("--mt-shadow-md", `0 4px 14px ${shadowBase}`);
    root.style.setProperty("--mt-shadow-lg", `0 8px 28px ${shadowBase}`);
}

/**
 * Theme service definition for Odoo's service registry.
 * This service depends on "pos" to ensure POS data is loaded before
 * we attempt to read config values.
 */
const themeService = {
    dependencies: ["pos"],
    
    start(env, { pos }) {
        // Inject theme colors as soon as POS service is available
        if (pos.config) {
            injectThemeColors(pos.config);
        }
        
        // Return the inject function so other code can re-apply if needed
        return {
            apply: (config) => injectThemeColors(config || pos.config),
        };
    },
};

// Register the theme service with lower sequence to run early
registry.category("services").add("mx_pos_theme", themeService, { sequence: 5 });
