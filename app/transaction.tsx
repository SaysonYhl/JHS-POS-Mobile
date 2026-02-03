import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput, StyleSheet, FlatList, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles, COLORS } from '@/constants/theme';
import { getProducts, updateStockwithTransaction } from '@/database/db';
import { useRouter } from 'expo-router';
import { transactionStyles } from './localStyles/transactionStyles';
import DiscountModal from './components/DiscountModal';

export default function TransactionScreen() {
    const router = useRouter();
    const [products, setProducts] = useState<any[]>([]);
    const [cart, setCart] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [discount, setDiscount] = useState(0);
    const [isDiscountModalVisible, setIsDiscountModalVisible] = useState(false);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const data = await getProducts();
        setProducts(data);
    };

    const addToCart = (product: any) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                if (existing.quantity >= product.stock) return prev; // Stock limit
                return prev.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateQuantity = (productId: number, amount: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === productId) {
                const newQty = item.quantity + amount;
                return newQty > 0 ? { ...item, quantity: newQty } : item;
            }
            return item;
        }));
    };

    const removeFromCart = (productId: number) => {
        setCart(prev => prev.filter(item => item.id !== productId));
    };

    // total amount calculation
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalAmount = Math.max(0, 0, subtotal - discount); //prevent negative totals

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedProducts = [...filteredProducts].sort((a, b) =>
        a.name.localeCompare(b.name)
    );

    const handleCheckout = async () => {
        try {
            // update stock in db
            await updateStockwithTransaction(cart, totalAmount, discount);

            // prepare data for receipt
            const receiptData = {
                items: JSON.stringify(cart),
                subtotal: subtotal,
                discount: discount,
                total: totalAmount,
                date: new Date().toISOString(),
            };

            // redirect to receipt page
            router.push({
                pathname: "/receipt",
                params: receiptData
            });

            // clear cart after save
            setCart([]);
            setDiscount(0);
        } catch (error) {
            console.error("Transaction failed:", error);
            alert("Failed to update stock. Please try again.");
        }
    }

    return (
        <SafeAreaView style={transactionStyles.container} edges={['bottom']}>
            {/* header */}
            <View style={transactionStyles.header}>
                <View style={transactionStyles.headerLeft}>
                    <TouchableOpacity onPress={() => router.back()} style={transactionStyles.backButton}>
                        <Ionicons name="arrow-back" size={28} color={COLORS.white} />
                    </TouchableOpacity>
                    <View>
                        <Text style={transactionStyles.headerTitle}>NEW TRANSACTION</Text>
                    </View>
                </View>

                <View style={transactionStyles.searchBar}>
                    <Ionicons name="search" size={20} color={COLORS.grayText} />
                    <TextInput
                        style={transactionStyles.searchInput}
                        placeholder="Search products..."
                        placeholderTextColor={COLORS.grayText}
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    {searchQuery.length > 0 && (
                        <TouchableOpacity onPress={() => setSearchQuery('')}>
                            <Ionicons name="close-circle" size={20} color={COLORS.grayText} />
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View style={{ flex: 1, flexDirection: 'row' }}>
                {/* product selection panel */}
                <View style={{ flex: 2.7, padding: 15 }}>
                    <FlatList
                        key={5}
                        data={sortedProducts}
                        numColumns={5}
                        keyExtractor={(item) => item.id.toString()}
                        contentContainerStyle={{ paddingBottom: 50 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={[transactionStyles.productButton, item.stock <= 0 && { opacity: 0.5 }]}
                                onPress={() => addToCart(item)}
                                disabled={item.stock <= 0}
                            >
                                <Text style={transactionStyles.productName} numberOfLines={1}>{item.name}</Text>
                                <Text style={transactionStyles.productWeight}>{item.weightValue} {item.weightUnit}</Text>
                                <Text style={transactionStyles.productPrice}>₱{parseFloat(item.price).toFixed(2)}</Text>
                                {/* <View style={[transactionStyles.stockBadge, { backgroundColor: item.stock < 5 ? '#fee2e2' : '#f1f5f9' }]}>
                                    <Text style={{ fontSize: 11, fontWeight: '700', color: item.stock < 5 ? COLORS.dangerRed : COLORS.grayText }}>
                                        {item.stock <= 0 ? "OUT OF STOCK" : `STOCK: ${item.stock}`}
                                    </Text>
                                </View> */}
                            </TouchableOpacity>
                        )}
                    />
                </View>

                {/* cart summary panel */}
                <View style={transactionStyles.cartSidebar}>
                    <View style={transactionStyles.cartHeader}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name="cart-outline" size={24} color={COLORS.navy} />
                            <Text style={transactionStyles.cartTitle}>Current Order</Text>
                        </View>

                        <TouchableOpacity onPress={() => setIsDiscountModalVisible(true)} style={transactionStyles.discountBtn}>
                            <Text style={{ color: COLORS.white, fontWeight: '800' }}>Discount</Text>
                        </TouchableOpacity>
                    </View>

                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        {cart.length === 0 ? (
                            <View style={transactionStyles.emptyCartContainer}>
                                <Ionicons name="basket-outline" size={80} color={COLORS.grayBorder} />
                                <Text style={transactionStyles.emptyCartText}>Cart is empty</Text>
                            </View>
                        ) : (
                            cart.map(item => (
                                <View key={item.id} style={transactionStyles.cartItem}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={transactionStyles.cartItemName}>{item.name}</Text>
                                        <Text style={transactionStyles.cartItemPrice}>₱{item.price.toFixed(2)}</Text>
                                    </View>

                                    <View style={transactionStyles.qtyControls}>
                                        {/* minus, quantity, and plus */}
                                        <View style={transactionStyles.qtyGrp}>
                                            <TouchableOpacity onPress={() => updateQuantity(item.id, -1)} style={transactionStyles.qtyBtn}>
                                                <Ionicons name="remove" size={16} color={COLORS.navy} />
                                            </TouchableOpacity>

                                            <Text style={transactionStyles.qtyText}>{item.quantity}</Text>

                                            <TouchableOpacity onPress={() => updateQuantity(item.id, 1)} style={transactionStyles.qtyBtn}>
                                                <Ionicons name="add" size={16} color={COLORS.navy} />
                                            </TouchableOpacity>
                                        </View>

                                        {/* remove item from cart button */}
                                        <TouchableOpacity onPress={() => removeFromCart(item.id)} style={transactionStyles.removeBtn}>
                                            <Ionicons name="trash-outline" size={18} color={COLORS.dangerRed} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            ))
                        )}
                    </ScrollView>

                    {/* total amount and checkout button */}
                    <View style={transactionStyles.cartFooter}>
                        <View style={transactionStyles.totalRow}>
                            <Text style={transactionStyles.totalLabel}>Total Amount</Text>
                            <Text style={transactionStyles.totalValue}>₱{totalAmount.toFixed(2)}</Text>
                        </View>
                        <TouchableOpacity
                            style={[transactionStyles.checkoutBtn, { backgroundColor: cart.length === 0 ? COLORS.grayBorder : COLORS.mediumBlue }]}
                            disabled={cart.length === 0} onPress={handleCheckout}
                        >
                            <Text style={transactionStyles.checkoutText}>Checkout</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* discount modal */}
            <DiscountModal
                isVisible={isDiscountModalVisible}
                onClose={() => setIsDiscountModalVisible(false)}
                subtotal={subtotal}
                discount={discount}
                setDiscount={setDiscount}
            />
        </SafeAreaView>
    );
}