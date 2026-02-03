import { StyleSheet, Platform } from "react-native";
import { COLORS } from "@/constants/theme";

export const transactionStyles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8fafc' },
    header: {
        height: 100,
        backgroundColor: COLORS.navy,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 10,
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.grayBorder,
        elevation: 1
    },
    headerLeft: { flexDirection: 'row', alignItems: 'center' },
    backButton: { width: 40, height: 40, borderRadius: 10, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
    headerTitle: { fontSize: 24, fontWeight: '800', color: COLORS.white },
    searchBar: { flex: 0.5, height: 40, backgroundColor: '#f1f5f9', borderRadius: 8, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, borderWidth: 1, borderColor: COLORS.grayBorder },
    searchInput: { flex: 1, marginLeft: 8, fontSize: 14, color: COLORS.navy },
    
    // product cards
    productButton: { 
        flex: 1, 
        margin: 5,
        padding: 12,
        backgroundColor: COLORS.white, 
        borderRadius: 12, 
        borderWidth: 1, 
        borderColor: COLORS.grayBorder, 
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        minHeight: 90, 
    },
    productName: { fontSize: 14, fontWeight: '700', color: COLORS.navy, textAlign: 'left' },
    productWeight: { fontSize: 11, color: COLORS.grayText },
    productPrice: { fontSize: 16, fontWeight: '900', color: COLORS.mediumBlue, marginTop: 4 },
    stockBadge: { marginTop: 6, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4 },

    // cart
    cartSidebar: { flex: 1, backgroundColor: COLORS.white, borderLeftWidth: 1, borderLeftColor: COLORS.grayBorder, padding: 15 },
    cartHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15, justifyContent: 'space-between' },
    cartTitle: { fontSize: 18, fontWeight: '800', marginLeft: 8, color: COLORS.navy},
    cartItem: { 
        paddingVertical: 8,
        borderBottomWidth: 1, 
        borderBottomColor: '#f1f5f9',
        flexDirection: 'column',
    },
    cartItemName: { fontSize: 14, fontWeight: '600', color: COLORS.navy },
    cartItemPrice: { fontSize: 12, color: COLORS.grayText },
    discountBtn: {flexDirection: 'row', alignItems: 'center', paddingVertical: 7, paddingHorizontal: 15, backgroundColor: COLORS.mediumBlue, borderRadius: 7},
    
    qtyControls: { 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        marginTop: 8,
        width: '100%',
    },
    qtyGrp: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, padding: 2 },
    qtyBtn: { width: 28, height: 28, borderRadius: 6, backgroundColor: COLORS.white, justifyContent: 'center', alignItems: 'center', elevation: 1 },
    qtyText: { fontSize: 14, fontWeight: '700', color: COLORS.navy, marginHorizontal: 12 },
    removeBtn: { padding: 6, backgroundColor: '#fff1f2', borderRadius: 6 },

    // footer
    cartFooter: { paddingTop: 15, borderTopWidth: 2, borderTopColor: '#f1f5f9' },
    totalRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    totalLabel: { fontSize: 14, color: COLORS.grayText },
    totalValue: { fontSize: 24, fontWeight: '900', color: COLORS.navy },
    checkoutBtn: { height: 55, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
    checkoutText: { color: COLORS.white, fontWeight: '800', fontSize: 16 },
    emptyCartContainer: { flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center', marginTop: 60 },
    emptyCartText : { marginTop: 15, color: COLORS.grayText, fontSize: 16, fontStyle: 'italic', textAlign: 'center' }
});

export default transactionStyles;