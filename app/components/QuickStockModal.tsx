import React from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import { GlobalStyles } from '@/constants/theme';
import { inventoryStyles } from '../localStyles/inventoryStyles';

interface StockModalProps {
    visible: boolean;
    product: any;
    value: string;
    setValue: (val: string) => void;
    onSave: (mode: 'add' | 'subtract') => void;
    onClose: () => void;
}

export const StockAdjustmentModal = ({ visible, product, value, setValue, onSave, onClose }: StockModalProps) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={inventoryStyles.modalOverlay}>
                <View style={[inventoryStyles.modalView, { width: '45%' }]}>
                    <Text style={inventoryStyles.productName}>Adjust Stock: {product?.name}</Text>
                    <Text style={{ marginVertical: 10, color: COLORS.grayText }}>
                        Current Stock: <Text style={{ fontWeight: 'bold', color: COLORS.navy }}>{product?.stock}</Text>
                    </Text>

                    <TextInput
                        style={GlobalStyles.inputField}
                        placeholder="Enter quantity"
                        keyboardType="number-pad"
                        value={value}
                        onChangeText={setValue}
                        autoFocus
                    />

                    <View style={{ flexDirection: 'row', gap: 10, marginTop: 20 }}>
                        <TouchableOpacity style={[inventoryStyles.adjustBtn, { backgroundColor: COLORS.dangerRed }]} onPress={() => onSave('subtract')}>
                            <Ionicons name="remove-circle-outline" size={20} color={COLORS.white} />
                            <Text style={inventoryStyles.adjustBtnText}>SUBTRACT</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={[inventoryStyles.adjustBtn, { backgroundColor: '#28a745' }]} onPress={() => onSave('add')}>
                            <Ionicons name="add-circle-outline" size={20} color={COLORS.white} />
                            <Text style={inventoryStyles.adjustBtnText}>ADD STOCK</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={{ marginTop: 15, padding: 10, alignItems: 'center' }} onPress={onClose}>
                        <Text style={{ color: COLORS.dangerRed, fontWeight: '700' }}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

export default StockAdjustmentModal;