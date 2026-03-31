import { View, Text, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { HapticButton } from '../components/HapticButton';

export default function Home() {
    const router = useRouter();

    // メニューアイテム
    const menuItems = [
        { label: '📞 電話をかける', action: () => console.log('Call') },
        { label: '👩 電話帳', action: () => console.log('Contacts') },
        { label: '📖 着信履歴', action: () => console.log('History') },
        { label: '🌤️ 天気予報', action: () => router.push('/weather') },
        { label: '📰 ニュース', action: () => router.push('/about') },
        { label: '📷 写真を撮る', action: () => router.push('/camera') },
        { label: '🖼️ 写真を見る', action: () => router.push('/gallery') },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.menu}>
                {menuItems.map((item, index) => (
                    <HapticButton key={index} style={styles.item} onPress={item.action}>
                        <Text style={styles.itemText}>{item.label}</Text>
                    </HapticButton>
                ))}
                <Text style={{ position: 'absolute', top: -40, alignSelf: 'center', fontSize: 18, color: Colors.text, fontWeight: 'bold' }}>
                    かぐ
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