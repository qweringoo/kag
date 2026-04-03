import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { WebView } from 'react-native-webview';

export default function NewsDetail() {
    const { url }: { url: string } = useLocalSearchParams();

    return (
        <View style={styles.container}>
            <WebView source={{ uri: url }} style={styles.webView} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    webView: {
        flex: 1,
    },

});