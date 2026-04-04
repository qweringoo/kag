import { View, Text, StyleSheet, TextInput } from 'react-native';
import { Colors } from '../constants/Colors';
import { HapticButton } from '../components/HapticButton';
import { useRouter } from 'expo-router';


export default function KanjiToCalendar() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <HapticButton style={styles.button} onPress={() => router.push('/kanji')}>
                <Text style={styles.text}>🔍️ 漢字を調べる</Text>
            </HapticButton>
            <HapticButton style={styles.button} onPress={() => router.push('/calendar')}>
                <Text style={styles.text}>📅 カレンダーを見る</Text>
            </HapticButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.background,
        gap: 20,
    },
    textInput: {
        width: '80%',
        height: 50,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        fontSize: 18,
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