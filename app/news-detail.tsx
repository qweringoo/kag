import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { WebView } from 'react-native-webview';

export default function NewsDetail() {
    const { url }: { url: string } = useLocalSearchParams();

    const hideAndMagnifyJS = `
  (function() {
    // 1. 不要な要素を消す
    const selectorsToHide = [
      'header', 'footer', '.p-header', '.p-footer', 
      '.c-side-column', '.p-article__share', '.p-article__related',
      '#related-news', '.c-breadcrumb'
    ];
    selectorsToHide.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => el.remove());
    });

    // 2. 文字サイズを 1bit ずつ巨大化
    const style = document.createElement('style');
    style.innerHTML = \`
      body { font-size: 24px !important; line-height: 1.8 !important;  }
      p { font-size: 24px !important; margin-bottom: 20px !important; }
      h1 { font-size: 32px !important; font-weight: bold !important; line-height: 1.4 !important; }
      img { width: 100% !important; height: auto !important; border-radius: 8px !important; }
    \`;
    document.head.appendChild(style);

    // 3. 画面の横揺れを防ぐためのパッチ
    document.body.style.overflowX = 'hidden';
  })();
  true;
`;

    return (
        <View style={styles.container}>
            <WebView source={{ uri: url }}
                style={styles.webView}
                injectedJavaScript={hideAndMagnifyJS}
                startInLoadingState={true}
            />
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