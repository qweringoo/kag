import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '../constants/Colors';
import { XMLParser } from 'fast-xml-parser';
import { useEffect, useState } from 'react';

interface NewsItem {
    title: string;
    link: string;
    pubDate?: string;
}

export default function News() {
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

    return (
        <View style={styles.container}>
            <FlatList
                data={news}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.itemCard}>
                        <Text style={styles.itemTitle}>{item.title}</Text>
                    </View>
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
        backgroundColor: Colors.primary,
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