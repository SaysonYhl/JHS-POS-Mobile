import { StyleSheet, Text, View } from 'react-native';

export default function Inventory() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Inventory List Coming Soon!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f9fafb',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: '#1f305e',
    },
});