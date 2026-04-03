import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { HapticButton } from '../components/HapticButton';
import { Colors } from '../constants/Colors';
import { format } from 'date-fns';

export default function PhotoDetail() {
    const { data } = useLocalSearchParams<{ data: string }>();
    const { uri, date }: { uri: string; date: number } = JSON.parse(data);

    useEffect(() => {
        return () => {
            ScreenOrientation.unlockAsync();
        }
    }, []);

    const lockOrientation = async () => {
        const orientation = await ScreenOrientation.getOrientationAsync();
        if (orientation === ScreenOrientation.Orientation.PORTRAIT_UP) {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE_LEFT);
        } else {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
        }
    };


    return (
        <View style={styles.container}>
            <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
            <View style={styles.upperContainer}>
                <Text style={styles.dateText}>{format(new Date(date), 'yyyy年MM月dd日')}</Text>
                <HapticButton
                    style={styles.button}
                    onPress={lockOrientation}>
                    <Text style={styles.buttonText}>🔄</Text>
                </HapticButton>
            </View>

        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    upperContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 20,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        backgroundColor: Colors.button,
        padding: 25,
        borderRadius: 30,
    },
    buttonText: {
        fontSize: 27,
    },
    dateText: {
        backgroundColor: Colors.secondary,
        padding: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        color: Colors.text,
        fontSize: 27,
    },
});