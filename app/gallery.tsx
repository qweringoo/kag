import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, FlatList } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import { Colors } from '../constants/Colors';
import { HapticButton } from '../components/HapticButton';

export default function Gallery() {
    const [assets, setAssets] = useState<MediaLibrary.Asset[]>([]);
    const [after, setAfter] = useState<string | undefined>(undefined);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [loading, setLoading] = useState(false);

    const { width } = Dimensions.get('window');
    const COLUMN_COUNT = 2; // 1行に表示する写真の数
    const IMAGE_SIZE = width / COLUMN_COUNT - 15; // 写真のサイズ（余白を考慮）

    const getPhotos = async (cursor?: string) => {
        if (loading || !hasNextPage) return;
        setLoading(true);

        const fetchedPhotos = await MediaLibrary.getAssetsAsync({
            first: 50, // 取得する写真の数
            after: cursor, // 前回の最後の写真のIDを指定
            sortBy: ['creationTime'], // 作成日時でソート
            mediaType: ['photo'], // 写真のみを取得
        });

        setAssets(prev => [...prev, ...fetchedPhotos.assets]);

        setHasNextPage(fetchedPhotos.hasNextPage);
        setAfter(fetchedPhotos.endCursor);
        setLoading(false);
    }

    const requestPermission = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('写真へのアクセスが必要です');
            return;
        }
    };
    useEffect(() => {
        requestPermission().then(() => {
            getPhotos();
        });
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{assets.length}枚の写真</Text>
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
                        <HapticButton style={styles.selectButton} onPress={() => alert('写真を選択')}>
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