import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, BackHandler } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router'; // Added Stack
import { COLORS } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';

export default function ReceiptScreen() {
    const params = useLocalSearchParams();
    const router = useRouter();
    
    const items = JSON.parse(params.items as string);

    // Prevent Android hardware back button from working
    useEffect(() => {
        const backAction = () => {
            return true; 
        };

        const backHandler = BackHandler.addEventListener(
            'hardwareBackPress',
            backAction
        );

        return () => backHandler.remove();
    }, []);

    return (
        <View style={styles.container}>
            {/* 1. HIDE THE TOP NAVIGATION BAR */}
            <Stack.Screen options={{ headerShown: false, gestureEnabled: false }} />

            <View style={styles.receiptCard}>
                <Ionicons name="checkmark-circle" size={60} color="#10b981" style={{ alignSelf: 'center' }} />
                <Text style={styles.successText}>Transaction Successful</Text>
                
                <View style={styles.divider} />
                
                <ScrollView style={styles.itemsList}>
                    {items.map((item: any) => (
                        <View key={item.id} style={styles.itemRow}>
                            <Text style={styles.itemText}>{item.quantity}x {item.name}</Text>
                            <Text style={styles.itemPrice}>₱{(item.price * item.quantity).toFixed(2)}</Text>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.divider} />

                <View style={styles.totalSection}>
                    <View style={styles.mathRow}><Text>Subtotal:</Text><Text>₱{parseFloat(params.subtotal as string).toFixed(2)}</Text></View>
                    <View style={styles.mathRow}><Text>Discount:</Text><Text style={{color: COLORS.dangerRed}}>-₱{parseFloat(params.discount as string).toFixed(2)}</Text></View>
                    <View style={styles.mathRow}><Text style={styles.grandTotalLabel}>Total Paid:</Text><Text style={styles.grandTotalValue}>₱{parseFloat(params.total as string).toFixed(2)}</Text></View>
                </View>

                {/* 2. ONLY NAVIGATION POINT */}
                <TouchableOpacity 
                    style={styles.doneButton} 
                    onPress={() => router.replace('/(tabs)')}
                >
                    <Text style={styles.doneButtonText}>Done</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f1f5f9', justifyContent: 'center', padding: 20, alignItems: 'center' },
    receiptCard: { backgroundColor: 'white', borderRadius: 20, padding: 25, elevation: 5, width: '50%' },
    successText: { fontSize: 20, fontWeight: '800', textAlign: 'center', color: COLORS.navy, marginTop: 10 },
    divider: { height: 1, backgroundColor: '#e2e8f0', marginVertical: 20, borderStyle: 'dashed' },
    itemsList: { maxHeight: 300 },
    itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    itemText: { fontSize: 16, color: COLORS.navy },
    itemPrice: { fontSize: 16, fontWeight: '600' },
    totalSection: { gap: 8 },
    mathRow: { flexDirection: 'row', justifyContent: 'space-between' },
    grandTotalLabel: { fontSize: 18, fontWeight: '800' },
    grandTotalValue: { fontSize: 22, fontWeight: '900', color: COLORS.mediumBlue },
    doneButton: { backgroundColor: COLORS.navy, padding: 18, borderRadius: 12, marginTop: 30, alignItems: 'center' },
    doneButtonText: { color: 'white', fontWeight: '800', fontSize: 16 }
});