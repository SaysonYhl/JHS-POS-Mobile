import { StyleSheet, Platform } from 'react-native';

// 1. BRAND COLORS
// Use these for text, icons, and direct background colors
export const COLORS = {
    navy: '#1f305e',         // Primary Brand
    mediumBlue: '#002BA1',
    lightNavy: '#2c4385',    // Lighter Navy for hover/active states
    successGreen: '#22c55e', // New Transaction / Checkout
    dangerRed: '#ef4444',    // Delete / Cancel
    white: '#ffffff',
    grayBg: '#f8fafc',       // Soft background
    grayBorder: '#e2e8f0',   // Subtle dividers
    grayText: '#64748b',     // Secondary info
    accentBlue: '#f0f4ff',   // Icon backgrounds
    warningOrange: '#f59e0b' // Low stock alerts
};

// 2. GLOBAL STYLES
export const GlobalStyles = StyleSheet.create({
    // Root wrapper for all screens
    screenContainer: {
        flex: 1,
        backgroundColor: COLORS.grayBg,
    },

    // Centered container for Landscape Tablets
    tabletCenterWrapper: {
        alignItems: 'center',
        paddingVertical: 30,
        paddingHorizontal: 20,
    },

    // MAIN CARDS (The Dashboard Buttons)
    primaryActionCard: {
        width: '100%',
        maxWidth: 900,
        backgroundColor: COLORS.mediumBlue,
        paddingVertical: 50,
        paddingHorizontal: 30,
        borderRadius: 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 12,
            },
            android: {
                elevation: 10,
            },
        }),
    },

    // SUMMARY CARDS (The 3-column stats)
    summaryCard: {
        backgroundColor: COLORS.white,
        width: '31%', // Fits 3 in a row with spacing
        paddingVertical: 35,
        paddingHorizontal: 20,
        borderRadius: 25,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.grayBorder,
        ...Platform.select({
            android: { elevation: 3 },
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.05,
                shadowRadius: 5,
            },
        }),
    },

    // TYPOGRAPHY
    headerText: {
        fontSize: 28,
        fontWeight: '900',
        color: COLORS.navy,
        // textTransform: 'uppercase',
        marginBottom: 20,
    },
    cardValue: {
        fontSize: 34,
        fontWeight: '900',
        color: COLORS.navy,
    },
    cardLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.grayText,
        textTransform: 'uppercase',
        marginTop: 10,
    },

    // INPUTS (For Inventory/Adding Products)
    inputField: {
        width: '100%',
        backgroundColor: COLORS.white,
        borderWidth: 1,
        borderColor: COLORS.grayBorder,
        borderRadius: 12,
        padding: 18,
        fontSize: 18,
        color: COLORS.navy,
        marginBottom: 20,
        marginTop: 5,
    },

    // ICON WRAPPERS
    iconCircle: {
        backgroundColor: COLORS.accentBlue,
        padding: 15,
        borderRadius: 100,
        marginBottom: 10,
    }
});