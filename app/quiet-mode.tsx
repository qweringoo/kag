import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { HapticButton } from '../components/HapticButton';
import * as Notifications from 'expo-notifications';
import { useEffect } from 'react';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowList: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    } as Notifications.NotificationBehavior),
});

Notifications.setNotificationChannelAsync('default', {
    name: 'default',
    importance: Notifications.AndroidImportance.MAX,
});

export default function QuietMode() {

    const sendNotify = async (mode: 'on' | 'off') => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'KAG_SYSTEM_SIGNAL',
                body: mode === 'on' ? 'MUTE_ON' : 'MUTE_OFF',
                priority: Notifications.AndroidNotificationPriority.MAX,
            },
            trigger: null,
        });
    };

    useEffect(() => {
        Notifications.requestPermissionsAsync();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>マナーモード</Text>
            <View style={styles.menuContainer}>
                <HapticButton style={styles.item} onPress={() => sendNotify('off')}>
                    <Text style={styles.itemText}>⭕️ 音を出す</Text>
                </HapticButton>
                <HapticButton style={styles.item} onPress={() => sendNotify('on')}>
                    <Text style={styles.itemText}>❌️ 音を消す</Text>
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