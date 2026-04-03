import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { useState, useEffect } from 'react';

interface NewsItem {
    title: string;
    link: string;
    pubDate?: string;
}

export default function NewsDetail() {
    const { url }: { url: string } = useLocalSearchParams();
    const [news, setNews] = useState<NewsItem[]>([]);

    const fetchNews = async () => {
        const jinaKey = process.env.EXPO_PUBLIC_JINA_KEY;

        const headers: Record<string, string> = {
            'Accept': 'application/json',
        };
        if (jinaKey) headers['Authorization'] = `Bearer ${jinaKey}`;

        try {
            const response = await fetch(`https://r.jina.ai/${url}`, {
                method: 'GET',
                headers: headers,
            });
            const data = await response.text();

            console.log(data);
        } catch (e) {
            console.error('ニュースの取得に失敗:', e);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    return (
        <View style={styles.container}>
            <Text>{url}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
});