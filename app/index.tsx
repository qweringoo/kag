import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Link } from 'expo-router';

export default function Home() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Hello, World!</Text>
            <Link href="/about">
                <Text style={styles.buttonText}>Go to About</Text>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        color: '#333',
        fontWeight: 'bold',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});