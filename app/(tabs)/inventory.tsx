import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Modal, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles, COLORS } from '@/constants/theme';
import { addProduct, getProducts, deleteProduct, updateProduct } from '@/database/db';
import { useIsFocused } from '@react-navigation/native';

export default function InventoryScreen() {
    const [modalVisible, setModalVisible] = useState(false);
    const [products, setProducts] = useState<any[]>([]);
    const isFocused = useIsFocused();
    const [editingId, setEditingId] = useState<number | null>(null);
    const [activeMenuId, setActiveMenuId] = useState<number | null>(null);
    const [stockModalVisible, setStockModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any>(null);
    const [quickStockValue, setQuickStockValue] = useState('');
    const [searchQuery, setSearchQuery] = useState('');

    // form state
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [weightValue, setWeightValue] = useState('');
    const [weightUnit, setWeightUnit] = useState('');

    const loadInventory = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    useEffect(() => {
        if (isFocused) loadInventory();
    }, [isFocused]);

    const handleSave = async () => {
        const cleanedName = name.trim();
        const numPrice = parseFloat(price);
        const numStock = parseInt(stock);

        if (!cleanedName || isNaN(numPrice) || isNaN(numStock)) {
            Alert.alert("Error", "Please fill in all required fields correctly.");
            return;
        }

        try {
            if (editingId) {
                await updateProduct(editingId, cleanedName, numPrice, numStock, weightValue, weightUnit);
            } else {
                await addProduct(cleanedName, numPrice, numStock, weightValue, weightUnit);
            }

            setName(''); setPrice(''); setStock('');
            setWeightValue(''); setWeightUnit('');
            setEditingId(null);
            setModalVisible(false);
            await loadInventory();
        } catch (error) {
            Alert.alert("Save Error", "Could not save the product.");
        }
    };

    const handleEditPress = (product: any) => {
        setEditingId(product.id);
        setName(product.name);
        setPrice(product.price.toString());
        setStock(product.stock.toString());
        setWeightValue(product.weightValue || '');
        setWeightUnit(product.weightUnit || '');
        setModalVisible(true);
    };

    const handleDeletePress = (product: any) => {
        Alert.alert("Delete", `Are you sure you want to delete ${product.name}?`, [
            { text: "Cancel", style: "cancel" },
            {
                text: "Delete",
                style: "destructive",
                onPress: async () => {
                    await deleteProduct(product.id);
                    loadInventory();
                }
            }
        ]);
    };

    const handleQuickAddStock = (product: any) => {
        setSelectedProduct(product);
        setQuickStockValue(''); // Clear previous input
        setStockModalVisible(true);
    };

    const saveQuickStock = async (mode: 'add' | 'subtract') => {
        const qty = parseInt(quickStockValue);

        if (isNaN(qty) || qty <= 0) {
            Alert.alert("Invalid Amount", "Please enter a number greater than 0.");
            return;
        }

        try {
            // Calculate new stock based on the button pressed
            const adjustment = mode === 'add' ? qty : -qty;
            const newStock = selectedProduct.stock + adjustment;

            if (newStock < 0) {
                Alert.alert("Error", "Stock cannot be less than zero.");
                return;
            }

            await updateProduct(
                selectedProduct.id,
                selectedProduct.name,
                selectedProduct.price,
                newStock,
                selectedProduct.weightValue,
                selectedProduct.weightUnit
            );

            setStockModalVisible(false);
            loadInventory();
        } catch (error) {
            console.error("Stock Update Error:", error);
        }
    };

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView style={GlobalStyles.screenContainer} edges={['left', 'right']}>
            <ScrollView contentContainerStyle={{ padding: 30 }}>

                <View style={localStyles.headerRow}>
                    <Text style={[GlobalStyles.headerText, { marginBottom: 0 }]}>Inventory</Text>

                    <View style={localStyles.searchContainer}>
                        <Ionicons name="search" size={20} color={COLORS.grayText} style={{ marginLeft: 12 }} />
                        <TextInput
                            style={localStyles.searchInput}
                            placeholder="Search products..."
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                        {searchQuery.length > 0 && (
                            <TouchableOpacity onPress={() => setSearchQuery('')} style={{ marginRight: 10 }}>
                                <Ionicons name="close-circle" size={18} color={COLORS.grayText} />
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                {filteredProducts.length === 0 ? (
                    <View style={[GlobalStyles.summaryCard, { width: '100%', padding: 60 }]}>
                        <Ionicons name="archive-outline" size={64} color={COLORS.grayBorder} />
                        <Text style={{ color: COLORS.grayText, fontSize: 18, marginTop: 10 }}>
                            Your products will appear here.
                        </Text>
                    </View>
                ) : (
                    filteredProducts.map((item) => (
                        <View key={item.id} style={localStyles.productCard}>
                            <View style={{ flex: 1 }}>
                                <Text style={localStyles.productName}>{item.name}</Text>
                                <Text style={{ color: COLORS.grayText }}>{item.weightValue} {item.weightUnit}</Text>
                                <Text style={{ fontWeight: '700', color: item.stock < 5 ? COLORS.dangerRed : COLORS.navy, marginTop: 4 }}>
                                    Stock: {item.stock}
                                </Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TouchableOpacity style={localStyles.addStockBtn} onPress={() => handleQuickAddStock(item)}>
                                    <Text style={localStyles.addStockText}>EDIT STOCK</Text>
                                </TouchableOpacity>

                                <View>
                                    <TouchableOpacity onPress={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)} style={{ padding: 10 }}>
                                        <Ionicons name="ellipsis-vertical" size={24} color={COLORS.grayText} />
                                    </TouchableOpacity>

                                    {activeMenuId === item.id && (
                                        <View style={localStyles.popoverMenu}>
                                            <TouchableOpacity style={localStyles.menuItem} onPress={() => { handleEditPress(item); setActiveMenuId(null); }}>
                                                <Ionicons name="pencil" size={18} color={COLORS.mediumBlue} />
                                                <Text style={localStyles.menuText}>Edit</Text>
                                            </TouchableOpacity>
                                            <View style={localStyles.menuDivider} />
                                            <TouchableOpacity style={localStyles.menuItem} onPress={() => { handleDeletePress(item); setActiveMenuId(null); }}>
                                                <Ionicons name="trash" size={18} color={COLORS.dangerRed} />
                                                <Text style={[localStyles.menuText, { color: COLORS.dangerRed }]}>Delete</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>

            <TouchableOpacity
                style={localStyles.fab}
                onPress={() => {
                    setEditingId(null);
                    setName(''); setPrice(''); setStock('');
                    setWeightValue(''); setWeightUnit('');
                    setModalVisible(true);
                }}
            >
                <Ionicons name="add" size={50} color={COLORS.white} />
            </TouchableOpacity>

            {/* PRODUCT MODAL */}
            <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
                <View style={localStyles.modalOverlay}>
                    <View style={localStyles.modalView}>
                        <View style={localStyles.modalHeader}>
                            <Text style={[GlobalStyles.headerText, { marginBottom: 0 }]}>{editingId ? "Edit Product" : "New Product"}</Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <Ionicons name="close-circle" size={35} color={COLORS.dangerRed} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView showsVerticalScrollIndicator={false}>
                            <Text style={GlobalStyles.cardLabel}>Product Name</Text>
                            <TextInput style={GlobalStyles.inputField} placeholder="e.g. Arizona Iced Tea" value={name} onChangeText={setName} />

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: '48%' }}>
                                    <Text style={GlobalStyles.cardLabel}>Price (₱)</Text>
                                    <TextInput style={GlobalStyles.inputField} placeholder="0.00" keyboardType="numeric" value={price} onChangeText={setPrice} />
                                </View>
                                <View style={{ width: '48%' }}>
                                    <Text style={GlobalStyles.cardLabel}>Stock Quantity</Text>
                                    <TextInput style={GlobalStyles.inputField} placeholder="Qty" keyboardType="number-pad" value={stock} onChangeText={setStock} />
                                </View>
                            </View>

                            <Text style={GlobalStyles.cardLabel}>Net Weight / Variant</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TextInput style={[GlobalStyles.inputField, { width: '48%' }]} placeholder="Value" keyboardType="numeric" value={weightValue} onChangeText={setWeightValue} />
                                <TextInput style={[GlobalStyles.inputField, { width: '48%' }]} placeholder="Unit" value={weightUnit} onChangeText={setWeightUnit} />
                            </View>

                            <TouchableOpacity style={[GlobalStyles.primaryActionCard, { marginTop: 20, paddingVertical: 12, minHeight: 60, elevation: 0, shadowOpacity: 0 }]} onPress={handleSave}>
                                <Text style={{ color: COLORS.white, fontWeight: '900', fontSize: 18 }}>SAVE TO INVENTORY</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* QUICK STOCK ADJUSTMENT MODAL */}
            <Modal visible={stockModalVisible} transparent animationType="fade">
                <View style={localStyles.modalOverlay}>
                    <View style={[localStyles.modalView, { width: '45%' }]}>
                        <Text style={localStyles.productName}>Adjust Stock: {selectedProduct?.name}</Text>
                        <Text style={{ marginVertical: 10, color: COLORS.grayText }}>
                            Current Stock: <Text style={{ fontWeight: 'bold', color: COLORS.navy }}>{selectedProduct?.stock}</Text>
                        </Text>

                        <TextInput
                            style={GlobalStyles.inputField}
                            placeholder="Enter quantity"
                            keyboardType="number-pad"
                            value={quickStockValue}
                            onChangeText={setQuickStockValue}
                            autoFocus
                        />

                        <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
                            {/* SUBTRACT BUTTON */}
                            <TouchableOpacity
                                style={[localStyles.adjustBtn, { backgroundColor: COLORS.dangerRed }]}
                                onPress={() => saveQuickStock('subtract')}
                            >
                                <Ionicons name="remove-circle-outline" size={20} color={COLORS.white} />
                                <Text style={localStyles.adjustBtnText}>SUBTRACT</Text>
                            </TouchableOpacity>

                            {/* ADD BUTTON */}
                            <TouchableOpacity
                                style={[localStyles.adjustBtn, { backgroundColor: '#28a745' }]} // Using a green for "Add"
                                onPress={() => saveQuickStock('add')}
                            >
                                <Ionicons name="add-circle-outline" size={20} color={COLORS.white} />
                                <Text style={localStyles.adjustBtnText}>ADD STOCK</Text>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity
                            style={{ marginTop: 15, padding: 10, alignItems: 'center' }}
                            onPress={() => setStockModalVisible(false)}
                        >
                            <Text style={{ color: COLORS.dangerRed, fontWeight: '700', fontSize: 14 }}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const localStyles = StyleSheet.create({
    fab: {
        position: 'absolute', bottom: 30, right: 30,
        backgroundColor: COLORS.mediumBlue, width: 80, height: 80, borderRadius: 40,
        justifyContent: 'center', alignItems: 'center', elevation: 10,
    },
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalView: { width: '60%', backgroundColor: COLORS.white, borderRadius: 30, padding: 25, maxHeight: '90%' },
    modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
    productCard: {
        backgroundColor: COLORS.white, padding: 20, borderRadius: 15, marginBottom: 10,
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        borderWidth: 1, borderColor: COLORS.grayBorder
    },
    productName: { fontSize: 18, fontWeight: 'bold', color: COLORS.navy },
    productPrice: { fontSize: 18, fontWeight: '900', color: COLORS.mediumBlue }, // Fixed comma here
    addStockBtn: { backgroundColor: COLORS.accentBlue, paddingHorizontal: 15, paddingVertical: 8, borderRadius: 8, marginRight: 10 },
    addStockText: { color: COLORS.navy, fontWeight: '800', fontSize: 12 },
    popoverMenu: {
        position: 'absolute', right: 40, top: 0, backgroundColor: COLORS.white,
        borderRadius: 12, padding: 5, elevation: 5, zIndex: 100, width: 100,
        borderWidth: 1, borderColor: COLORS.grayBorder,
    },
    menuItem: { flexDirection: 'row', alignItems: 'center', padding: 10 },
    menuText: { marginLeft: 10, fontWeight: '600', color: COLORS.navy },
    menuDivider: { height: 1, backgroundColor: COLORS.grayBorder, marginHorizontal: 5 },
    adjustBtn: {
        flex: 1,
        flexDirection: 'row',
        paddingVertical: 15,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
    },
    adjustBtnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        marginLeft: 8,
        fontSize: 14,
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: COLORS.grayBorder,
        height: 45,
        width: '20%',
    },
    searchInput: {
        flex: 1,
        paddingHorizontal: 10,
        fontSize: 16,
        color: COLORS.navy,
    },
});