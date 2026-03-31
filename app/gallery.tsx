import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Colors } from '../constants/Colors';

export default function Gallery() {
    const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);

    const { width } = Dimensions.get('window');
    const COLUMN_COUNT = 3; // 1行に表示する写真の数
    const IMAGE_SIZE = width / COLUMN_COUNT - 10; // 写真のサイズ（余白を考慮）

    const getPhotos = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('写真へのアクセスが必要です');
            return;
        }

        const fetchedPhotos = await MediaLibrary.getAssetsAsync({
            first: 100, // 取得する写真の数
            sortBy: ['creationTime'], // 作成日時でソート
            mediaType: ['photo'], // 写真のみを取得
        });

        setAssets(fetchedPhotos.assets);
    }

    useEffect(() => {
        getPhotos();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{assets.length} 枚の写真</Text>
            <ScrollView contentContainerStyle={styles.grid}>
                {assets.map((asset) => (
                    <Image
                        key={asset.id}
                        source={{ uri: asset.uri }}
                        style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: 8 }}
                    />
                ))}
            </ScrollView>
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
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: Colors.text,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        padding: 5,
        gap: 10,
    },
});