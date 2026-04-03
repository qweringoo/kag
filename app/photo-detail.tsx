import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { HapticButton } from '../components/HapticButton';
import { Colors } from '../constants/Colors';

export default function PhotoDetail() {
    const { uri } = useLocalSearchParams<{ uri: string }>();

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
            <HapticButton
                style={styles.button}
                onPress={lockOrientation}>
                <Text style={styles.buttonText}>🔄</Text>
            </HapticButton>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    button: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: Colors.button,
        padding: 25,
        borderRadius: 30,
    },
    buttonText: {
        fontSize: 27,
    },
});