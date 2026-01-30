import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: COLORS.mediumBlue,
                tabBarInactiveTintColor: COLORS.grayText,
                tabBarStyle: {
                    height: 95,
                    paddingBottom: 35,
                    paddingHorizontal: 20,
                    backgroundColor: COLORS.white,
                    borderTopWidth: 1,
                    borderTopColor: COLORS.grayBorder,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '700',
                    marginBottom: 5,
                },
                tabBarIconStyle: {
                    marginTop: 5,
                },
                tabBarHideOnKeyboard: true,
                headerTitleStyle: {
                    fontWeight: '900',
                    fontSize: 24,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                },
                headerStyle: {
                    backgroundColor: COLORS.navy,
                },
                headerTintColor: COLORS.white,
                headerTitleAlign: 'center',
            }}
        >
            {/* DASHBOARD */}
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Dashboard',
                    headerTitle: 'JHS POS-INVENTORY',
                    tabBarIcon: ({ color }) => <Ionicons name="grid" size={28} color={color} />,
                }}
            />

            {/* INVENTORY */}
            <Tabs.Screen
                name="inventory"
                options={{
                    title: 'Inventory',
                    headerTitle: 'Inventory Management',
                    tabBarIcon: ({ color }) => <Ionicons name="cube" size={28} color={color} />
                }}
            />

            {/* HISTORY */}
            <Tabs.Screen
                name="history"
                options={{
                    title: 'History',
                    headerTitle: 'Transaction History',
                    tabBarIcon: ({ color }) => <Ionicons name="receipt" size={28} color={color} />,
                }}
            />

            {/* REPORTS */}
            <Tabs.Screen
                name="reports"
                options={{
                    title: 'Reports',
                    headerTitle: 'Sales Reports',
                    tabBarIcon: ({ color }) => <Ionicons name="bar-chart" size={28} color={color} />,
                }}
            />
        </Tabs>
    )
}