import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import RSSParser from 'rss-parser';
import { useEffect } from 'react';

export default function News() {
    const parser = new RSSParser();

    const fetchNews = async () => {
        try {
            const url = process.env.EXPO_PUBLIC_RSS_URL;

            if (!url) {
                console.error('RSS URLが設定されていません, /.envファイルを確認してください.');
                return;
            }

            const response = await fetch(url);
            const xml = await response.text();
            const feed = await parser.parseString(xml);

            console.log('news title:', feed.title);
            feed.items.forEach(item => {
                console.log('news item:', item.title);
            });
        } catch (e) {
            console.error('ニュースの取得に失敗:', e);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <View style={styles.container}>
            <Text>ニュースはまだありません。</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    }
});