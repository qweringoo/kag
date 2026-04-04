import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, FlatList, Alert } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Colors } from '../constants/Colors';
import { HapticButton } from '../components/HapticButton';
import { useRouter, useFocusEffect } from 'expo-router';

export default function Gallery() {
    const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
    const [after, setAfter] = useState<string | undefined>(undefined);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { width } = Dimensions.get('window');
    const COLUMN_COUNT = 2; // 1行に表示する写真の数
    const IMAGE_SIZE = width / COLUMN_COUNT - 15; // 写真のサイズ（余白を考慮）

    const getPhotos = async (cursor?: string) => {
        if (loading || !hasNextPage) return;
        setLoading(true);

        const fetchedPhotos = await MediaLibrary.getAssetsAsync({
            first: 50, // 取得する写真の数
            sortBy: [[MediaLibrary.SortBy.creationTime, false]], // 作成日時でソート
            mediaType: ['photo'], // 写真のみを取得
        });

        setAssets(fetchedPhotos.assets);

        setHasNextPage(fetchedPhotos.hasNextPage);
        setAfter(fetchedPhotos.endCursor);
        setLoading(false);
    }

    const requestPermission = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('⚠️ 権限エラー', '写真へのアクセスを許可してください.');
            console.log('写真へのアクセス許可が必要です.');
            return;
        }
    };

    useFocusEffect(
        useCallback(() => {
            getPhotos();
        }, [])
    );

    useEffect(() => {
        requestPermission();
    }, []);

    const openDetail = (uri: string, creationTime: number) => {
        const photoData = { uri: uri, date: creationTime };
        router.push({ pathname: '/photo-detail', params: { data: JSON.stringify(photoData) } });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>写真を見る</Text>
            {loading && <Text style={{ fontSize: 16, position: 'absolute', right: 20, color: 'orange' }}>更新中...</Text>}

            <FlatList
                data={assets}
                keyExtractor={(item) => item.id}
                numColumns={COLUMN_COUNT}
                renderItem={({ item }) => (
                    <View key={item.id}>
                        <Image
                            source={{ uri: item.uri }}
                            style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, borderRadius: 8, margin: 5 }}
                        />
                        <HapticButton style={styles.selectButton} onPress={() => openDetail(item.uri, item.creationTime)}>
                            <Text style={styles.selectButtonIcon}>👆🏼</Text>
                        </HapticButton>
                    </View>)}
                onEndReached={() => getPhotos(after)}
                onEndReachedThreshold={0.5}
            />
        </View >
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
    selectButton: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        justifyContent: 'center',
        width: 40,
        height: 40,
        borderRadius: 50,
        backgroundColor: Colors.button,
    },
    selectButtonIcon: {
        position: 'relative',
        fontSize: 20,
        fontWeight: 'bold',
        color: Colors.text,
        textAlign: 'center',
    },
});