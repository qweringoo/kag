import { Stack, useRouter, usePathname } from 'expo-router';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { HapticButton } from '../components/HapticButton';

export default function RootLayout() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <SafeAreaView style={styles.mainContainer}>
            {/* 画面の重なり（遷移）の設定 */}
            <Stack screenOptions={{ headerShown: false }}>

                <Stack.Screen name="index" />
                <Stack.Screen name="about" />
                <Stack.Screen name="camera" />
                <Stack.Screen name="gallery" />
                <Stack.Screen name="weather" />

                <Stack.Screen
                    name="photo-detail"
                    options={{
                        presentation: 'modal',
                        animation: 'slide_from_bottom'
                    }} />
            </Stack>

            {/* 右下のフローティングメニュー */}
            <View style={styles.floatingMenu}>
                {/* ホームに戻るボタン */}
                <HapticButton
                    style={styles.button}
                    onPress={() => router.replace('/')}
                >
                    <Text style={styles.icon}>🏠</Text>
                </HapticButton>

                {/* 戻るボタン */}
                {pathname !== '/' && (
                    <HapticButton
                        style={[styles.button, styles.backButton]}
                        onPress={() => router.back()}
                    >
                        <Text style={styles.icon}>👈🏼</Text>
                    </HapticButton>
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
        bottom: 50,
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