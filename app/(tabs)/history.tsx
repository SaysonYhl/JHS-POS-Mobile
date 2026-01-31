import { StyleSheet, Text, View } from 'react-native';

export default function History() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Transaction History Coming Soon!</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#f9fafb',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '900',
        color: '#1f305e',
    },
});