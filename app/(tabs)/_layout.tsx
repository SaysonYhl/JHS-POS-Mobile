import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: '#1f305e',
                tabBarStyle: {
                    height: 90,         
                    paddingBottom: 35,    
                    paddingHorizontal: 20, 
                    backgroundColor: '#ffffff',
                    borderTopWidth: 1,
                    borderTopColor: '#e2e8f0',
                },
                // This replaces the red-underlined line:
                tabBarHideOnKeyboard: true,
                headerTitleStyle: { fontWeight: 'bold', fontSize: 27 },
                headerStyle: { backgroundColor: '#1f305e' },
                headerTintColor: '#ffffff',
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                    headerTitle: 'JHS POS-INVENTORY',
                    tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="inventory"
                options={{
                    title: 'Inventory',
                    headerTitle: 'Inventory',
                    tabBarIcon: ({ color }) => <Ionicons name="cube" size={24} color={color} />,
                }}
            />
            <Tabs.Screen
                name="reports"
                options={{
                    title: 'Reports',
                    headerTitle: 'Sales Reports',
                    tabBarIcon: ({ color }) => <Ionicons name="bar-chart" size={24} color={color} />,
                }}
            />
        </Tabs>
    );
}