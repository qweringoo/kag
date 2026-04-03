import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';

export default function Address() {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>電話帳</Text>
            <Text style={styles.text}>（開発中）</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 30,
        color: Colors.text,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 20,
        color: Colors.text,
    }
});