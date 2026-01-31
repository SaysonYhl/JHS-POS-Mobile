import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert, Platform } from 'react-native'; // Added Platform
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles, COLORS } from '@/constants/theme';
import { addProduct, getProducts, deleteProduct, updateProduct } from '@/database/db';
import { useIsFocused } from '@react-navigation/native';
import { inventoryStyles } from '../localStyles/inventoryStyles';
import { ProductModal } from '../components/ProductModal';
import { StockAdjustmentModal } from '../components/QuickStockModal';

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
        setQuickStockValue('');
        setStockModalVisible(true);
    };

    const saveQuickStock = async (mode: 'add' | 'subtract') => {
        const qty = parseInt(quickStockValue);
        if (isNaN(qty) || qty <= 0) {
            Alert.alert("Invalid Amount", "Please enter a number greater than 0.");
            return;
        }
        try {
            const adjustment = mode === 'add' ? qty : -qty;
            const newStock = selectedProduct.stock + adjustment;
            if (newStock < 0) {
                Alert.alert("Error", "Stock cannot be less than zero.");
                return;
            }
            await updateProduct(selectedProduct.id, selectedProduct.name, selectedProduct.price, newStock, selectedProduct.weightValue, selectedProduct.weightUnit);
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

            <View style={inventoryStyles.headerRow}>
                <Text style={[GlobalStyles.headerText, { marginBottom: 0 }]}>Inventory</Text>
                <View style={inventoryStyles.searchContainer}>
                    <Ionicons name="search" size={20} color={COLORS.grayText} style={{ marginLeft: 12 }} />
                    <TextInput
                        style={inventoryStyles.searchInput}
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

            <ScrollView
                contentContainerStyle={{ paddingHorizontal: 25, paddingVertical: 5 }}
                onScrollBeginDrag={() => setActiveMenuId(null)}
            >
                {filteredProducts.length > 0 && (
                    <View style={{ flexDirection: 'row', paddingHorizontal: 20, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: COLORS.grayBorder, marginBottom: 10 }}>
                        <View style={{ width: 65 }} />
                        <Text style={{ flex: 2, marginLeft: 20, color: COLORS.grayText, fontWeight: '700', fontSize: 12 }}>PRODUCT</Text>
                        <Text style={{ flex: 1, textAlign: 'center', color: COLORS.grayText, fontWeight: '700', fontSize: 12 }}>PRICE</Text>
                        <Text style={{ flex: 1, textAlign: 'center', color: COLORS.grayText, fontWeight: '700', fontSize: 12 }}>STOCK</Text>
                        <View style={{ flex: 1.5 }} />
                    </View>
                )}

                {filteredProducts.length === 0 ? (
                    <View style={[GlobalStyles.summaryCard, { width: '100%', padding: 60, alignItems: 'center', justifyContent: 'center' }]}>
                        <Ionicons name="archive-outline" size={64} color={COLORS.grayBorder} />
                        <Text style={{ color: COLORS.grayText, fontSize: 18, marginTop: 10, textAlign: 'center' }}>
                            {searchQuery ? "No products match your search." : "Your products will appear here."}
                        </Text>
                    </View>
                ) : (
                    filteredProducts.map((item) => (
                        <View key={item.id} style={inventoryStyles.productCard}>
                            <View style={inventoryStyles.imagePlaceholder}>
                                <Ionicons name="image-outline" size={24} color={COLORS.grayBorder} />
                            </View>

                            <View style={{ flex: 2, marginLeft: 20 }}>
                                <Text style={inventoryStyles.productName} numberOfLines={1}>{item.name}</Text>
                                <Text style={{ color: COLORS.grayText, fontSize: 14 }}>{item.weightValue} {item.weightUnit}</Text>
                            </View>

                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={inventoryStyles.productPrice}>₱{parseFloat(item.price).toFixed(2)}</Text>
                            </View>

                            <View style={{ flex: 1, alignItems: 'center' }}>
                                <Text style={{ fontWeight: '800', fontSize: 16, color: item.stock < 5 ? COLORS.dangerRed : COLORS.navy }}>{item.stock} Qty</Text>
                                {item.stock < 5 && <Text style={{ fontSize: 10, color: COLORS.dangerRed, fontWeight: '700' }}>LOW STOCK</Text>}
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1.5, justifyContent: 'flex-end' }}>
                                <TouchableOpacity style={inventoryStyles.addStockBtn} onPress={() => handleQuickAddStock(item)}>
                                    <Text style={inventoryStyles.addStockText}>EDIT STOCK</Text>
                                </TouchableOpacity>

                                <View>
                                    <TouchableOpacity onPress={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)} style={{ paddingLeft: 15 }}>
                                        <Ionicons name={activeMenuId === item.id ? "close" : "ellipsis-vertical"} size={24} color={COLORS.grayText} />
                                    </TouchableOpacity>

                                    {activeMenuId === item.id ? (
                                        <View style={inventoryStyles.popoverMenu}>
                                            <TouchableOpacity style={inventoryStyles.menuItem} onPress={() => { handleEditPress(item); setActiveMenuId(null); }}>
                                                <Ionicons name="pencil" size={18} color={COLORS.mediumBlue} />
                                                <Text style={inventoryStyles.menuText}>Edit</Text>
                                            </TouchableOpacity>
                                            <View style={inventoryStyles.menuDivider} />
                                            <TouchableOpacity style={inventoryStyles.menuItem} onPress={() => { handleDeletePress(item); setActiveMenuId(null); }}>
                                                <Ionicons name="trash" size={18} color={COLORS.dangerRed} />
                                                <Text style={[inventoryStyles.menuText, { color: COLORS.dangerRed }]}>Delete</Text>
                                            </TouchableOpacity>
                                        </View>
                                    ) : null}
                                </View>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>

            <TouchableOpacity
                style={inventoryStyles.fab}
                onPress={() => {
                    setEditingId(null);
                    setName(''); setPrice(''); setStock('');
                    setWeightValue(''); setWeightUnit('');
                    setModalVisible(true);
                }}
            >
                <Ionicons name="add" size={50} color={COLORS.white} />
            </TouchableOpacity>

            <ProductModal
                visible={modalVisible} onClose={() => setModalVisible(false)} onSave={handleSave}
                editingId={editingId} name={name} setName={setName} price={price} setPrice={setPrice}
                stock={stock} setStock={setStock} weightValue={weightValue} setWeightValue={setWeightValue}
                weightUnit={weightUnit} setWeightUnit={setWeightUnit}
            />

            <StockAdjustmentModal
                visible={stockModalVisible} product={selectedProduct} value={quickStockValue}
                setValue={setQuickStockValue} onSave={saveQuickStock} onClose={() => setStockModalVisible(false)}
            />
        </SafeAreaView>
    );
}