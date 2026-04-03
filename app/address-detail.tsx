import { useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';
import { HapticButton } from '../components/HapticButton';
import { Colors } from '../constants/Colors';
import { callPhone } from './call';

export default function AddressDetail() {
    const { data } = useLocalSearchParams<{ data: string }>();
    const { name, phoneNumbers }: { name: string; phoneNumbers: Contacts.PhoneNumber[] | undefined } = JSON.parse(data);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{name}の連絡先</Text>
            {phoneNumbers && phoneNumbers.length > 0 && (
                phoneNumbers.map((phone, index) => (
                    phone.number && phone.number !== phoneNumbers[index - 1]?.number && (
                        <HapticButton key={index} style={styles.button} onPress={() => callPhone(phone.number!)}>
                            <Text style={styles.text}>
                                電話する: {phone.number}
                            </Text>
                        </HapticButton>
                    )
                ))
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 200,
        backgroundColor: Colors.background,
    },
    text: {
        fontSize: 27,
        fontWeight: 'bold',
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: Colors.button,
        borderRadius: 10,
        elevation: 3,
    },
});
