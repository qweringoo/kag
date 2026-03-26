import { useEffect, useState, useRef, use } from 'react';
import { StyleSheet, Text, Alert, TouchableOpacity, ScrollView, View, AppState, AppStateStatus } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Location from 'expo-location';
import { Colors } from '../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CACHE_KEY = 'weather_cache';

interface WeatherData {
    daily: {
        time: string[];
        temperature_2m_max: number[];
        temperature_2m_min: number[];
        weathercode: number[];
        precipitation_probability_max: number[];
    }
}

export default function App() {

    const appState = useRef<AppStateStatus>(AppState.currentState);
    const [forecast, setForecast] = useState<WeatherData | null>(null);
    const [loading, setLoading] = useState(false);
    const [address, setAddress] = useState<string>('現在地を取得中...');

    const fetchWeather = async (latitude: number, longitude: number) => {
        setLoading(true);
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max&timezone=Asia%2FTokyo`;
        try {
            const response = await fetch(url);
            const data = await response.json();
            setForecast(data);
            return data;
        } catch (error) {
            Alert.alert('エラー', '天気予報がわかりませんでした。',
                [
                    { text: 'もう一度試す', onPress: () => fetchWeather(latitude, longitude) },
                ]);
        } finally {
            setLoading(false);
        }
    };

    const updateLocationAndWeather = async () => {
        setLoading(true);
        try {
            // 位置情報の許可をリクエスト
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('位置情報の許可が必要です');
                return;
            }
            // 現在地を取得
            const location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            // 住所を逆ジオコーディングで取得
            const reverse = await Location.reverseGeocodeAsync({ latitude, longitude });
            const city = reverse[0]?.city || reverse[0]?.district || '現在の場所';
            setAddress(city);

            // 天気予報を取得
            const data = await fetchWeather(latitude, longitude);

            // キャッシュに保存
            await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({ forecast: data, address: city, timestamp: Date.now() }));
        } catch (e) {
            setAddress('更新できませんでした。');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {

        const loadCache = async () => {
            const savedData = await AsyncStorage.getItem(CACHE_KEY);
            if (savedData) {
                const { forecast, address } = JSON.parse(savedData);
                setForecast(forecast);
                setAddress(address);
            }
            // 最新情報を取得
            updateLocationAndWeather();
        };

        loadCache();

        const subscription = AppState.addEventListener('change', (nextAppState: AppStateStatus) => {
            if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
                updateLocationAndWeather();
            }
            appState.current = nextAppState;
        });

        return () => subscription.remove();
    }, []);

    function getDayOfWeek(dateString: string) {
        const date = new Date(dateString);
        const days = ['日', '月', '火', '水', '木', '金', '土'];
        return days[date.getDay()];
    }

    // 天気コードをアイコン（絵文字）に変換する関数
    const getWeatherIcon = (code: number) => {
        if (code <= 1) return '☀️'; // 快晴
        if (code == 2) return '⛅️';  // 晴れ時々曇り
        if (code == 3) return '☁️';  // くもり
        if (code <= 48) return '🌫️'; // 霧
        if (code <= 67) return '☔';  // 雨
        if (code <= 77) return '❄️';  // 雪
        if (code <= 82) return '🌧️';  // 激しい雨
        if (code <= 99) return '⚡';  // 雷雨
        return '❓';
    };

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', flexDirection: 'row', gap: 10, marginTop: 10, marginBottom: 10, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.titleText}>⛅️{address}のお天気</Text>
                {loading && <Text style={{ ...styles.text, fontSize: 16, position: 'absolute', right: 20, color: 'orange' }}>更新中...</Text>}
            </View>
            {forecast ? (
                <ScrollView style={styles.mainView} contentContainerStyle={{ gap: 20, marginTop: 20 }}>
                    {forecast && (
                        forecast.daily.time.map((date, index) => (
                            <View style={styles.dailyItem} key={index}>
                                <View style={styles.leftSection}>
                                    <Text style={{ ...styles.textH2, fontSize: 30 }}>{getWeatherIcon(forecast.daily.weathercode[index])}</Text>
                                    {new Date(date).getDate() === new Date().getDate() ? <Text style={styles.textH2}>今日</Text> :
                                        (<><Text style={styles.textH2}>{date.slice(-5, -3)}/{date.slice(-2)}</Text>
                                            <Text style={{ ...styles.text, fontSize: 16 }}>({getDayOfWeek(date)})</Text></>)}
                                </View>
                                <View style={styles.rightSection}>
                                    <Text style={styles.text}>降水確率: {forecast.daily.precipitation_probability_max[index]}%</Text>
                                    <Text style={styles.text}>
                                        <Text style={{ color: 'red' }}>{forecast.daily.temperature_2m_max[index]}°C</Text> / <Text style={{ color: 'blue' }}>{forecast.daily.temperature_2m_min[index]}°C</Text>
                                    </Text>
                                </View>
                            </View>
                        ))
                    )}
                    <Text style={{ ...styles.text, fontSize: 16, color: 'gray', textAlign: 'center' }}>
                        ※天気予報はOpen-Meteo APIを使用しています。
                    </Text>
                    <View style={{ height: 150 }} />
                </ScrollView>
            ) : (
                <Text style={{ ...styles.text, fontSize: 50, marginTop: 50, textAlign: 'center' }}>天気予報を{"\n"}調べています{"\n"}お待ちください...</Text>
            )}
        </View>
    );

}

const styles = StyleSheet.create({
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    textH2: {
        fontSize: 27,
        fontWeight: 'bold',
    },
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
    },
    button: {
        backgroundColor: 'green',
        padding: 10,
        borderRadius: 5,
    },
    dailyItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.primary,
        padding: 15,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 3,
    },
    mainView: {
        flex: 1,
        width: '100%',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
    },
    rightSection: {
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 5,
    },
});
