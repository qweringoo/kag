import { StyleSheet, Text, View } from 'react-native';

export default function About() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>About Page</Text>
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
        fontWeight: 'bold',
    },
});