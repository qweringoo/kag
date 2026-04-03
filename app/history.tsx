import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

export default function History() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>⚠️ ごめんなさい!</Text>
            <Text style={styles.text}> 通話履歴は現在使用することができません.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
    },
    text: {
        fontSize: 27,
        fontWeight: 'bold',
        color: Colors.text,
    },
});