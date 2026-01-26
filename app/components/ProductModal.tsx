import React from 'react';
import { Modal, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import { GlobalStyles } from '@/constants/theme';
import { inventoryStyles } from '../localStyles/inventoryStyles';

interface ProductModalProps {
    visible: boolean;
    onClose: () => void;
    onSave: () => void;
    editingId: number | null;
    name: string;
    setName: (val: string) => void;
    price: string;
    setPrice: (val: string) => void;
    stock: string;
    setStock: (val: string) => void;
    weightValue: string;
    setWeightValue: (val: string) => void;
    weightUnit: string;
    setWeightUnit: (val: string) => void;
}

export const ProductModal = (props: ProductModalProps) => {
    return (
        <Modal animationType="slide" transparent={true} visible={props.visible} onRequestClose={props.onClose}>
            <View style={inventoryStyles.modalOverlay}>
                <View style={inventoryStyles.modalView}>
                    <View style={inventoryStyles.modalHeader}>
                        <Text style={[GlobalStyles.headerText, { marginBottom: 0 }]}>
                            {props.editingId ? "Edit Product" : "New Product"}
                        </Text>
                        <TouchableOpacity onPress={props.onClose}>
                            <Ionicons name="close-circle" size={35} color={COLORS.dangerRed} />
                        </TouchableOpacity>
                    </View>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={GlobalStyles.cardLabel}>Product Name</Text>
                        <TextInput style={GlobalStyles.inputField} placeholder="e.g. Arizona Iced Tea" value={props.name} onChangeText={props.setName} />

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View style={{ width: '48%' }}>
                                <Text style={GlobalStyles.cardLabel}>Price (₱)</Text>
                                <TextInput style={GlobalStyles.inputField} placeholder="0.00" keyboardType="numeric" value={props.price} onChangeText={props.setPrice} />
                            </View>
                            <View style={{ width: '48%' }}>
                                <Text style={GlobalStyles.cardLabel}>Stock Quantity</Text>
                                <TextInput style={GlobalStyles.inputField} placeholder="Qty" keyboardType="number-pad" value={props.stock} onChangeText={props.setStock} />
                            </View>
                        </View>

                        <Text style={GlobalStyles.cardLabel}>Net Weight / Variant</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TextInput style={[GlobalStyles.inputField, { width: '48%' }]} placeholder="Value" keyboardType="numeric" value={props.weightValue} onChangeText={props.setWeightValue} />
                            <TextInput style={[GlobalStyles.inputField, { width: '48%' }]} placeholder="Unit" value={props.weightUnit} onChangeText={props.setWeightUnit} />
                        </View>

                        <TouchableOpacity style={[GlobalStyles.primaryActionCard, { marginTop: 20, paddingVertical: 12, minHeight: 60 }]} onPress={props.onSave}>
                            <Text style={{ color: COLORS.white, fontWeight: '900', fontSize: 18 }}>SAVE TO INVENTORY</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

export default ProductModal;