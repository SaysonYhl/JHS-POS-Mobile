import { StyleSheet } from "react-native";
import { COLORS } from "@/constants/theme";

export const inventoryStyles = StyleSheet.create({
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.grayBorder,
        height: 45,
        width: '40%'
    },
    searchInput: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 16,
        color: COLORS.navy
    },
    productCard: {
        backgroundColor: COLORS.white,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 15,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderColor: COLORS.grayBorder,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    imagePlaceholder: {
        width: 65,
        height: 65,
        backgroundColor: COLORS.accentBlue,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.grayBorder,
        borderStyle: 'dashed'
    },
    productName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.navy
    },
    productPrice: {
        fontSize: 18,
        fontWeight: '900',
        color: COLORS.mediumBlue
    },
    addStockBtn: {
        backgroundColor: COLORS.accentBlue,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 8,
        marginRight: 5
    },
    addStockText: {
        color: COLORS.navy,
        fontWeight: '800',
        fontSize: 12
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalView: {
        width: '60%',
        backgroundColor: COLORS.white,
        borderRadius: 30,
        padding: 25,
        maxHeight: '90%'
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20
    },
    adjustBtn: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 15,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2
    },
    adjustBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 14
    },
    popoverMenu: {
        position: 'absolute',
        right: 45,
        top: -10,
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 5,
        elevation: 10,
        zIndex: 100,
        width: 120,
        borderWidth: 1,
        borderColor: COLORS.grayBorder,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12
    },
    menuText: {
        marginLeft: 10,
        fontWeight: '600',
        color: COLORS.navy
    },
    menuDivider: {
        height: 1,
        backgroundColor: COLORS.grayBorder,
        marginHorizontal: 5
    },
    fab: {
        position: 'absolute',
        bottom: 30,
        right: 30,
        backgroundColor: COLORS.mediumBlue,
        width: 70,
        height: 70,
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
    },
});

export default inventoryStyles;