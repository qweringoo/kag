import { Calendar, LocaleConfig } from 'react-native-calendars';
import { View, StyleSheet, Text } from 'react-native';
import { Colors } from '../constants/Colors';
import { HapticButton } from '../components/HapticButton';

LocaleConfig.locales['jp'] = {
    monthNames: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    dayNames: ['日曜日', '月曜日', '火曜日', '水曜日', '木曜日', '金曜日', '土曜日'],
    dayNamesShort: ['日', '月', '火', '水', '木', '金', '土'],
};
LocaleConfig.defaultLocale = 'jp';

export default function MyCalendar() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>カレンダー</Text>
            <Calendar
                theme={{
                    calendarBackground: Colors.background,
                    textSectionTitleColor: Colors.text,
                    dayTextColor: Colors.text,
                    todayTextColor: Colors.text,
                    monthTextColor: Colors.text,
                    textDayFontSize: 27,
                    textMonthFontSize: 27,
                    textDayHeaderFontSize: 27,
                    textDayFontWeight: 'bold',
                    textMonthFontWeight: 'bold',
                    textDayHeaderFontWeight: 'bold',
                    todayBackgroundColor: Colors.primary,
                }}
                onDayPress={() => { }}
                renderArrow={(direction) => (
                    <View style={styles.arrowButton}>
                        <Text style={styles.arrowText}>{direction === 'left' ? '前' : '次'}</Text>
                    </View>
                )}
                onPressArrowLeft={(subtractMonth) => subtractMonth()}
                onPressArrowRight={(addMonth) => addMonth()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        paddingTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.text,
        position: 'absolute',
        top: 20,
        alignSelf: 'center',
    },
    arrowButton: {
        padding: 10,
        backgroundColor: Colors.button,
        borderRadius: 10,
        elevation: 3,
    },
    arrowText: {
        fontSize: 27,
        color: Colors.text,
        fontWeight: 'bold',
    }
});