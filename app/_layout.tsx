import { Stack } from "expo-router";
import { useEffect } from "react";
import { initDatabase } from "@/database/db";

export default function RootLayout() {
    useEffect(() => {
        initDatabase();
    }, []);

    return (
        <Stack>
            {/* This hides the header for the tabs (Dashboard, Inventory) */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* This hides the default header for your new transaction screen */}
            <Stack.Screen
                name="transaction"
                options={{
                    headerShown: false,
                    presentation: 'fullScreenModal',
                }}
            />
        </Stack>
    );
}
