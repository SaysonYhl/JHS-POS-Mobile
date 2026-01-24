import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function Dashboard() {
    // Shared styles to keep code clean
    const cardShadow = {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f9fafb' }} edges={['left', 'right']}>
            <ScrollView 
                contentContainerStyle={{ 
                    alignItems: 'center', 
                    paddingVertical: 40,
                    paddingHorizontal: 20 
                }}
            >
                
                {/* 1. NEW TRANSACTION CARD */}
                <View style={{ width: '100%', maxWidth: 900, marginBottom: 40 }}>
                    <TouchableOpacity 
                        style={{ 
                            backgroundColor: '#1F305E', 
                            padding: 50, 
                            borderRadius: 40,
                            flexDirection: 'row', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            ...cardShadow
                        }}
                        activeOpacity={0.9}
                    >
                        <Ionicons name="cart" size={60} color="white" />
                        <View style={{ marginLeft: 24 }}>
                            <Text style={{ color: 'white', fontSize: 36, fontWeight: '900', textTransform: 'uppercase' }}>
                                New Transaction
                            </Text>
                            <Text style={{ color: '#bfdbfe', fontSize: 18, opacity: 0.8 }}>
                                Tap here to start a new sale
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* 2. DAILY SUMMARY */}
                <View style={{ width: '100%', maxWidth: 900 }}>
                    <Text style={{ color: '#1f305e', fontSize: 24, fontWeight: '900', marginBottom: 24, marginLeft: 8, textTransform: 'uppercase' }}>
                        Daily Summary
                    </Text>
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        
                        {/* Summary Card Logic */}
                        {[
                            { label: 'Total Sales', value: '₱0', icon: 'cash' },
                            { label: 'Transactions', value: '0', icon: 'receipt' },
                            { label: 'Items Sold', value: '0', icon: 'cube' }
                        ].map((item, index) => (
                            <View 
                                key={index}
                                style={{ 
                                    backgroundColor: 'white', 
                                    padding: 35, 
                                    borderRadius: 30, // Direct Fix
                                    width: '31%', 
                                    alignItems: 'center', 
                                    justifyContent: 'center',
                                    borderWidth: 1,
                                    borderColor: '#f1f5f9',
                                    ...cardShadow
                                }}
                            >
                                <View style={{ backgroundColor: '#f0f4ff', padding: 16, borderRadius: 100, marginBottom: 16 }}>
                                    <Ionicons name={item.icon as any} size={32} color="#1f305e" />
                                </View>
                                <Text style={{ color: '#94a3b8', fontWeight: 'bold', fontSize: 12, textTransform: 'uppercase' }}>
                                    {item.label}
                                </Text>
                                <Text style={{ color: '#1f305e', fontSize: 32, fontWeight: '900', marginTop: 4 }}>
                                    {item.value}
                                </Text>
                            </View>
                        ))}
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
}