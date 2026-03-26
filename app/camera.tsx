import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { HapticButton } from '../components/HapticButton';
import { Colors } from '../constants/Colors';

export default function CameraScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef<CameraView>(null);
    const router = useRouter();
    const [facing, setFacing] = useState<'front' | 'back'>('back');

    // カメラの向きを切り替える関数
    const toggleCameraFacing = () => {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    };

    // 1. 権限の確認
    if (!permission) {
        return <View />; // ローディング中
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
                <Text style={styles.message}>カメラを使う許可が必要です</Text>
                <HapticButton style={styles.button} onPress={requestPermission}>
                    <Text style={styles.buttonText}>許可する</Text>
                </HapticButton>
            </View>
        );
    }

    // 2. 写真を撮る関数
    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({ quality: 0.5 });
                console.log(photo.uri); // 撮った写真の保存先
                Alert.alert('撮れました！', 'きれいに撮れましたよ。');
            } catch (e) {
                Alert.alert('エラー', 'うまく撮れませんでした。');
            }
        }
    };

    return (
        <View style={styles.container}>
            <CameraView style={styles.camera} ref={cameraRef} facing={facing}>
                <View style={styles.overlay}>
                    {/* カメラの向きを切り替えるボタン（右上） */}
                    <HapticButton style={styles.facingButton} onPress={toggleCameraFacing}>
                        <Text style={{ color: Colors.text, fontWeight: 'bold', fontSize: 23 }}>🔄️</Text>
                    </HapticButton>
                    {/* シャッターボタン（中央下） */}
                    <View style={styles.shutterContainer}>
                        <HapticButton style={styles.shutter} onPress={takePicture}>
                            <View style={styles.shutterInner} />
                            <Text style={{ color: Colors.text, fontWeight: 'bold', position: 'absolute', fontSize: 32, transform: [{ translateY: -4 }] }}>📷️</Text>
                        </HapticButton>
                    </View>
                </View>
            </CameraView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
    camera: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        backgroundColor: 'transparent',
        justifyContent: 'flex-end',
        padding: 40,
        marginBottom: 30,
    },
    message: {
        textAlign: 'center',
        color: '#fff',
        fontSize: 20,
        marginBottom: 20,
    },
    button: {
        backgroundColor: Colors.button,
        padding: 15,
        borderRadius: 10,
        alignSelf: 'center',
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    shutterContainer: {
        alignItems: 'center',
        gap: 10,
    },
    shutter: {
        width: 90,
        height: 90,
        borderRadius: 45,
        backgroundColor: 'rgba(255,255,255,0.3)',
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 4,
        borderColor: Colors.button,
    },
    shutterInner: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: Colors.button,
    },
    facingButton: {
        position: 'absolute',
        top: 40,
        right: 20,
        backgroundColor: Colors.button,
        padding: 20,
        borderRadius: 30,
        elevation: 5,
    },
});