import { View, Text, StyleSheet, Alert, Linking } from 'react-native'
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { HapticButton } from '../components/HapticButton';
import Constants from 'expo-constants';

export default function Home() {
    const router = useRouter();

    // メニューアイテム
    const menuItems = [
        { label: '📞 電話をかける', action: () => router.push('/call') },
        { label: '👩 電話帳', action: () => router.push('/address') },
        { label: '📅 漢字とカレンダー', action: () => router.push('/kanji-calendar') },
        { label: '🌤️ 天気予報', action: () => router.push('/weather') },
        { label: '📰 ニュース', action: () => router.push('/news') },
        { label: '📷 写真', action: () => router.push('/picture') },
        { label: '♫ マナーモード', action: () => router.push('/quiet-mode') },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.menu}>
                {menuItems.map((item, index) => (
                    <HapticButton key={index} style={styles.item} onPress={item.action}>
                        {item.label === '📅 漢字とカレンダー' ? (
                            <Text style={{ ...styles.itemText, fontSize: 20 }}>{item.label}</Text>
                        ) : (
                            <Text style={styles.itemText}>{item.label}</Text>
                        )}
                    </HapticButton>
                ))}
                <Text style={{ position: 'absolute', top: -40, alignSelf: 'center', fontSize: 18, color: Colors.text, fontWeight: 'bold' }}>
                    かぐ v{Constants.expoConfig?.version}
                </Text>
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
    text: {
        fontSize: 24,
        color: '#333',
        fontWeight: 'bold',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    item: {
        backgroundColor: Colors.button,
        padding: 20,
        borderRadius: 10,
        elevation: 3,
    },
    menu: {
        gap: 20,
        width: '80%',
    },
    itemText: {
        fontSize: 30,
        color: Colors.text,
        fontWeight: 'bold',
    }
});