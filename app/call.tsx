import { View, Text, StyleSheet, Linking } from 'react-native';
import { Colors } from '../constants/Colors';
import { HapticButton } from '../components/HapticButton';
import { useState } from 'react';

const callPhone = async (number: string) => {
    const targetApp: string = process.env.EXPO_PUBLIC_USE_RAKUTEN_LINK === 'true' ? 'rakuten' : 'default';
    const cleanedNumber = number.replace(/-/g, '');
    let url = '';
    if (targetApp === 'rakuten') url = `rakutenlink://link/dial?number=${cleanedNumber}`;
    else url = `tel:${cleanedNumber}`;

    try {
        if (targetApp === 'rakuten') {
            const supported = await Linking.canOpenURL(url);
            if (supported) await Linking.openURL(url);
            else Linking.openURL(`tel:${cleanedNumber}`);
        } else Linking.openURL(url);
    } catch (e) {
        console.error('電話をかけられませんでした.', e);
    }
};

export default function Call() {
    const [targetNumber, setTargetNumber] = useState('');

    const buttons = [
        1, 2, 3,
        4, 5, 6,
        7, 8, 9,
        '*', 0, '#'
    ]

    const handlePress = (value: number | string) => {
        if (targetNumber.length >= 13) return;
        if (targetNumber.length === 3 || targetNumber.length === 8) {
            setTargetNumber(prev => prev + '-');
        }
        if (value === '*' || value === '#') {
            setTargetNumber(prev => prev + value);
        } else {
            setTargetNumber(prev => prev + value.toString());
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.targetNumber}>{targetNumber}</Text>
            <View style={styles.grid}>
                {buttons.map((number, index) => (
                    <HapticButton key={index} style={styles.button} onPress={() => handlePress(number)}>
                        <Text style={styles.buttonText}>{number}</Text>
                    </HapticButton>
                ))}
            </View>
            <View style={styles.bottomContainer}>
                <HapticButton style={styles.clearButton} onPress={() => setTargetNumber('')}>
                    <Text style={styles.buttonText}>❌️</Text>
                </HapticButton>
                <HapticButton style={styles.button} onPress={() => callPhone(targetNumber)}>
                    <Text style={styles.buttonText}>📞</Text>
                </HapticButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.background,
        paddingTop: 50,
    },
    bottomContainer: {
        flexDirection: 'row',
        marginTop: 50,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 30,
        alignSelf: 'flex-start',
        marginLeft: 40,
    },
    clearButton: {
        backgroundColor: Colors.button,
        padding: 20,
        borderRadius: 10,
        elevation: 3,
    },
    button: {
        backgroundColor: Colors.button,
        padding: 20,
        borderRadius: 10,
        elevation: 3,
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 35,
        color: Colors.text,
        fontWeight: 'bold',
    },
    grid: {
        width: '100%',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 25,
    },
    targetNumber: {
        fontSize: 40,
        color: Colors.text,
        fontWeight: 'bold',
        marginBottom: 50,
    }

});