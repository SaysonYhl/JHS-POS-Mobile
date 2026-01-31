import { Stack } from "expo-router";
import { useEffect } from "react";
import { initDatabase } from "@/database/db";

export default function RootLayout() {
    useEffect(() => {
        initDatabase();
    }, []);

    return (
        <Stack>
            {/* hides header in dashboard and inventory */}
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            {/* hides default header for new transaction screen */}
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
