import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { XMLParser } from 'fast-xml-parser';
import { useEffect, useRef, useState } from 'react';
import { HapticButton } from '../components/HapticButton';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NewsItem {
    title: string;
    link: string;
    pubDate?: string;
}

const CACHE_KEY = 'news_cache';

export default function News() {
    const router = useRouter();
    const [news, setNews] = useState<NewsItem[]>([]);
    const rssIndexRef = useRef(0);
    const [loading, setLoading] = useState(false);

    const fetchNews = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const rawUrls: string = process.env.EXPO_PUBLIC_RSS_URLS;
            if (!rawUrls || rawUrls.length === 0) {
                console.error('RSS URLが設定されていません, /.envファイルを確認してください.');
                return;
            }
            const urls = rawUrls.split(',').map(url => url.trim());

            if (rssIndexRef.current >= urls.length) return;
            const url = urls[rssIndexRef.current];

            const response = await fetch(url);
            const xml = await response.text();

            const parser = new XMLParser({
                ignoreAttributes: false,
                attributeNamePrefix: '@_',
            });

            const jsonObj = parser.parse(xml);

            const feed = jsonObj.rss.channel;

            const items = Array.isArray(feed.item) ? feed.item : [feed.item];

            setNews(prev => [...prev, ...items]);
            rssIndexRef.current += 1;

            await AsyncStorage.setItem(CACHE_KEY, JSON.stringify([...news, ...items]));

        } catch (e) {
            console.error('ニュースの取得に失敗:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const loadCache = async () => {
            const savedData = await AsyncStorage.getItem(CACHE_KEY);
            if (savedData) {
                setNews(JSON.parse(savedData));
            }
        };
        loadCache();
        fetchNews();
    }, []);

    const openDetail = (link: string) => {
        router.push({ pathname: '/news-detail', params: { url: link } });
    };
    return (
        <View style={styles.container}>
            <View style={{ width: '100%', flexDirection: 'row', gap: 10, marginTop: 10, marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.text}>最近のニュース</Text>
                {loading && <Text style={{ ...styles.text, fontSize: 16, position: 'absolute', right: 20, color: 'orange' }}>更新中...</Text>}
            </View>
            <FlatList
                data={news}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <HapticButton style={styles.itemCard} onPress={() => openDetail(item.link)}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                    </HapticButton>
                )}
                onEndReached={() => fetchNews()}
                onEndReachedThreshold={0.5}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    itemCard: {
        backgroundColor: Colors.button,
        padding: 15,
        marginHorizontal: 10,
        marginTop: 10,
        borderRadius: 8,
    },
    itemTitle: {
        color: Colors.text,
        fontSize: 27,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },

});