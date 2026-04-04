import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';
import { WebView } from 'react-native-webview';

export default function NewsDetail() {
  const { url }: { url: string } = useLocalSearchParams();

  const hideAndMagnifyJS = `
  (function() {
    // 1. remove() ではなく display: none !important を使う
    const style = document.createElement('style');
    style.innerHTML = \`
      /* 不要な要素を非表示にする（物理的には残す） */
      header, footer, .p-header, .p-footer, 
      .c-side-column, .p-article__share, .p-article__related,
      #related-news, .c-breadcrumb { 
        display: none !important; 
      }

      /* 文字サイズを巨大化 */
      body { font-size: 20px !important; line-height: 1.8 !important; }
      p { font-size: 20px !important; margin-bottom: 20px !important; }
      h1 { font-size: 20px !important; font-weight: bold !important; }
      img { width: 100% !important; height: auto !important; border-radius: 8px !important; }
    \`;
    document.head.appendChild(style);
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