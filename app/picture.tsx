import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { HapticButton } from '../components/HapticButton';
import { useRouter } from 'expo-router';

export default function Picture() {
    const router = useRouter();

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>写真</Text>
            <View style={styles.menuContainer}>
                <HapticButton style={styles.item} onPress={() => router.push('/camera')}>
                    <Text style={styles.itemText}>📷 写真を撮る</Text>
                </HapticButton>
                <HapticButton style={styles.item} onPress={() => router.push('/gallery')}>
                    <Text style={styles.itemText}>🖼️ 写真を見る</Text>
                </HapticButton>
            </View>
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
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        position: 'absolute',
        top: 20,
        color: Colors.text,
    },
    menuContainer: {
        gap: 20,
        width: '80%',
    },
    item: {
        backgroundColor: Colors.button,
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        alignItems: 'center',
    },
    itemText: {
        fontSize: 30,
        color: Colors.text,
        fontWeight: 'bold',
    }
});