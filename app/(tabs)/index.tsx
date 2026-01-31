import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { GlobalStyles, COLORS } from '@/constants/theme';
import { useRouter } from 'expo-router';

export default function Dashboard() {
    const router = useRouter();

    return (
        <SafeAreaView style={GlobalStyles.screenContainer} edges={['left', 'right']}>
            <ScrollView 
                contentContainerStyle={GlobalStyles.tabletCenterWrapper}
            >
                
                {/* new transaction card */}
                <View style={{ width: '100%', maxWidth: 900, marginBottom: 40 }}>
                    <TouchableOpacity 
                        style={GlobalStyles.primaryActionCard}
                        activeOpacity={0.9}
                        onPress={() => router.push('/transaction')}
                    >
                        <Ionicons name="cart" size={60} color={COLORS.white} />
                        <View style={{ marginLeft: 24 }}>
                            <Text style={{ color: COLORS.white, fontSize: 36, fontWeight: '900', textTransform: 'uppercase' }}>
                                New Transaction
                            </Text>
                            <Text style={{ color: '#bfdbfe', fontSize: 18, opacity: 0.8 }}>
                                Tap here to start a new sale
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>

                {/* daily summary section */}
                <View style={{ width: '100%', maxWidth: 900 }}>
                    <Text style={GlobalStyles.headerText}>
                        Daily Summary
                    </Text>
                    
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                        
                        {[
                            { label: 'Total Sales', value: '₱0', icon: 'cash' },
                            { label: 'Transactions', value: '0', icon: 'receipt' },
                            { label: 'Items Sold', value: '0', icon: 'cube' }
                        ].map((item, index) => (
                            <View 
                                key={index}
                                style={GlobalStyles.summaryCard}
                            >
                                <View style={GlobalStyles.iconCircle}>
                                    <Ionicons name={item.icon as any} size={32} color={COLORS.navy} />
                                </View>
                                <Text style={GlobalStyles.cardLabel}>
                                    {item.label}
                                </Text>
                                <Text style={GlobalStyles.cardValue}>
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