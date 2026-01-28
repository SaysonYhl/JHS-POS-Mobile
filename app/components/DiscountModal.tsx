import React from "react";
import { Modal, View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '@/constants/theme';
import { GlobalStyles } from '@/constants/theme';

interface DiscountModalProps {
    isVisible: boolean;
    onClose: () => void;
    subtotal: number;
    discount: number;
    setDiscount: (val: number) => void;
}

// export default function DiscountModal({ isVisible, onClose, subtotal, discount, setDiscount}: DiscountModalProps) {
//     const newTotal = Math.max(0, subtotal, discount);

//     return (
//         <Modal visible={isVisible} transparent animationType="fade">
//             <View style={StyleSheet.overlay}
//         </Modal>
//     )
// }

