import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '@/constants/theme';

interface DiscountModalProps {
    isVisible: boolean;
    onClose: () => void;
    subtotal: number;
    discount: number;
    setDiscount: (val: number) => void;
}

export default function DiscountModal({ isVisible, onClose, subtotal, discount, setDiscount }: DiscountModalProps) {
    const newTotal = Math.max(0, subtotal - discount);

    return (
        <Modal visible={isVisible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.content}>
                    <Text style={styles.title}>Add Discount</Text>

                    {/* MATH SECTION */}
                    <View style={styles.mathContainer}>
                        <View style={styles.mathRow}>
                            <Text style={styles.label}>Current Total:</Text>
                            <Text style={styles.value}>₱{subtotal.toFixed(2)}</Text>
                        </View>

                        <View style={styles.inputRow}>
                            <Text style={styles.label}>Discount Amount:</Text>
                            <TextInput 
                                style={styles.input}
                                keyboardType="numeric"
                                placeholder="0.00"
                                value={discount === 0 ? '' : discount.toString()}
                                onChangeText={(val) => setDiscount(Number(val) || 0)}
                                autoFocus
                            />
                        </View>

                        <View style={[styles.mathRow, styles.totalRow]}>
                            <Text style={styles.totalLabel}>New Total:</Text>
                            <Text style={styles.totalValue}>₱{newTotal.toFixed(2)}</Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.doneBtn} onPress={onClose}>
                        <Text style={styles.doneBtnText}>APPLY DISCOUNT</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
    content: { width: 350, backgroundColor: 'white', borderRadius: 20, padding: 25, elevation: 10 },
    title: { fontSize: 22, fontWeight: '900', color: COLORS.navy, marginBottom: 20, textAlign: 'center' },
    mathContainer: { backgroundColor: '#f8fafc', padding: 15, borderRadius: 12, marginBottom: 20 },
    mathRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
    inputRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15, borderBottomWidth: 1, borderBottomColor: '#e2e8f0', paddingBottom: 10 },
    label: { fontSize: 14, color: COLORS.grayText, fontWeight: '600' },
    value: { fontSize: 16, color: COLORS.navy, fontWeight: '700' },
    input: { fontSize: 20, fontWeight: '900', color: COLORS.mediumBlue, textAlign: 'right', minWidth: 100 },
    totalRow: { borderTopWidth: 1, borderTopColor: '#cbd5e1', paddingTop: 10, marginTop: 5 },
    totalLabel: { fontSize: 16, fontWeight: '800', color: COLORS.navy },
    totalValue: { fontSize: 22, fontWeight: '900', color: COLORS.navy },
    doneBtn: { backgroundColor: COLORS.navy, padding: 15, borderRadius: 12, alignItems: 'center' },
    doneBtnText: { color: 'white', fontWeight: '800', fontSize: 16 }
});