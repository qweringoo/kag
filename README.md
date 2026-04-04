# 🌙 kag
Kind Apps for Grandma - おばあちゃんのためのやさしいランチャー&amp;ツール集

**kag** は, スマホに不慣れなおばあちゃんが, 家族とつながり, 日常を便利に過ごすための「世界一優しい」モバイルアプリ・エコシステムです.

****Android専用です. iOSには対応していませんご了承下さい.***



## 🌟 Concept
難しいことはできません! シンプルでわかりやすいアプリを目指しています.

- **Big & Simple**: すべてのボタンはきいろ ![](https://img.shields.io/badge/-%23FDF08F-FDF08F) で, タッチ可能な場所をわかりやすく.
- **One-Tap Access**: 電話, 天気, ニュース, カメラに迷わずアクセス.
- **No Confusion**: 常に「もどる」ボタンが同じ場所にあり, 迷子になりません.

## ✨️ Features
- [x] **Launcher**: 7つの巨大ボタンによるメニュー画面
- [x] **Kind Phonebook**: 端末の情報と連携したわかりやすい電話帳
- [x] **Weather & News**: 難しい設定なしで地元の情報を表示
- [x] **KAG Camera**: 撮るのも見るのも簡単な専用カメラ

## 🚀 Quick Start
****Node.js, gitがすでにインストールされていることを前提としています.***
1. **リポジトリをクローン**: `$ git clone https://github.com/qweringo/kag.git`
2. **依存関係をインストール**: `$ npm install`
3. **環境変数を設定**: `$ mv .env.example .env`
4. **eas-cliをインストール**: `$ npm install -g eas-cli`
5. **開発サーバーを起動**: `$ npx expo start`
   
   または
5. **.apkをビルド**: `$ eas build --platform android --profile preview --local`
 
**⚠️ apkビルドで.envが正しく読み込まれない場合があります. ビルド後newsでエラーが出る場合は, 以下の手順で.envを環境変数にエクスポートしてから再ビルドしてください.**  
**.envを環境変数にエクスポート**: `$ export $(cat .env | xargs)`

## ⚙️ Environment Variables
| Variable | Description | Default | Example |
| :--- | :--- | :--- | :--- |
| `EXPO_PUBLIC_USE_RAKUTEN_LINK` | 楽天リンクを優先使用するか | `false` | `true` |
| `EXPO_PUBLIC_RSS_URLS` | 「ニュース」で使用するRSS用URL(,区切りで複数指定可) | `your_rss_url_here` | `https://example.com/1.xml,https://example.com/2.xml,https://example.com/3.xml` |

## 📦 Tech Stack
- **Framework**: React Native (Expo)
- **API**: [Open-Meteo](https://open-meteo.com/) (Weather data)
