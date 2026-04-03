import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { XMLParser } from 'fast-xml-parser';
import { useEffect, useState } from 'react';
import { HapticButton } from '../components/HapticButton';

interface NewsItem {
    title: string;
    link: string;
    pubDate?: string;
}

export default function News() {
    const router = useRouter();
    const [news, setNews] = useState<NewsItem[]>([]);

    const fetchNews = async () => {
        try {
            const url = process.env.EXPO_PUBLIC_RSS_URL;

            if (!url) {
                console.error('RSS URLが設定されていません, /.envファイルを確認してください.');
                return;
            }

            const response = await fetch(url);
            const xml = await response.text();

            const parser = new XMLParser({
                ignoreAttributes: false,
                attributeNamePrefix: '@_',
            });

            const jsonObj = parser.parse(xml);

            const feed = jsonObj.rss.channel;

            const items = Array.isArray(feed.item) ? feed.item : [feed.item];

            setNews(items);
        } catch (e) {
            console.error('ニュースの取得に失敗:', e);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const openDetail = (link: string) => {
        router.push({ pathname: '/news-detail', params: { url: link } });
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={news}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <HapticButton style={styles.itemCard} onPress={() => openDetail(item.link)}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                    </HapticButton>
                )}
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
    }

});