import { Stack, useRouter, usePathname } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <SafeAreaView style={styles.mainContainer}>
            {/* 画面の重なり（遷移）の設定 */}
            <Stack screenOptions={{ headerShown: false }} />

            {/* 右下のフローティングメニュー */}
            <View style={styles.floatingMenu}>
                {/* ホームに戻るボタン */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.replace('/')}
                >
                    <Text style={styles.icon}>🏠</Text>
                </TouchableOpacity>

                {/* 戻るボタン */}
                {pathname !== '/' && (
                    <TouchableOpacity
                        style={[styles.button, styles.backButton]}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.icon}>👈🏼</Text>
                    </TouchableOpacity>
                )}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    floatingMenu: {
        position: 'absolute',
        bottom: 30,
        right: 20,
        flexDirection: 'column-reverse', // 下から上に並べる
        gap: 15,
    },
    button: {
        width: 80,
        height: 80,
        borderRadius: 30,
        backgroundColor: Colors.button,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,         // Androidの影
        shadowColor: '#000',  // iOSの影
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
    },
    backButton: {
        backgroundColor: Colors.button,
    },
    icon: {
        fontSize: 40,
    },
});