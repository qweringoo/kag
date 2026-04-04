import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors } from '../constants/Colors';
import { HapticButton } from '../components/HapticButton';
import { useRouter } from 'expo-router';


export default function Calender() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text>hey</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: Colors.background,
        gap: 20,
    },
    textInput: {
        borderColor: 'gray',
        paddingHorizontal: 10,
        marginHorizontal: 10,
        borderRadius: 10,
        fontSize: 50,
        marginTop: 100,
        color: Colors.text,
        backgroundColor: Colors.button,
    },
    button: {
        padding: 15,
        backgroundColor: Colors.button,
        borderRadius: 10,
        elevation: 3,
        width: '80%',
        alignItems: 'center',
    },
    text: {
        fontSize: 27,
        fontWeight: 'bold',
        color: Colors.text,
    },
});