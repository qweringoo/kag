import { Alert, StyleSheet, Text, View, FlatList } from 'react-native';
import { Colors } from '../constants/Colors';
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';
import { HapticButton } from '../components/HapticButton';
import { router } from 'expo-router';

export default function Address() {
    const [contacts, setContacts] = useState<Contacts.Contact[]>([]);

    const openDetail = (name: string, phoneNumbers: Contacts.PhoneNumber[] | undefined) => {
        const addressData = { name: name, phoneNumbers: phoneNumbers };
        router.push({ pathname: '/address-detail', params: { data: JSON.stringify(addressData) } });
    };

    useEffect(() => {
        const fetchContacts = async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('連絡先へのアクセスが必要です');
                return;
            }
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.ID, Contacts.Fields.Name, Contacts.Fields.PhoneticLastName, Contacts.Fields.PhoneticFirstName],
            });
            if (data.length < 1) return;

            const sortedContacts = [...data].sort((a, b) => {
                const nameA = a.phoneticLastName || a.phoneticFirstName || '';
                const nameB = b.phoneticLastName || b.phoneticFirstName || '';

                return nameA.localeCompare(nameB, 'ja');
            });
            setContacts(sortedContacts);
        };
        fetchContacts();
    }, []);

    return (
        <View style={styles.container}>
            <FlatList
                data={contacts}
                renderItem={({ item, index }) => (
                    <HapticButton style={styles.itemCard} onPress={() => openDetail(item.name, item.phoneNumbers)}>
                        <Text style={styles.text}>{item.name}</Text>
                    </HapticButton>
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ padding: 20 }}
                style={{ width: '100%' }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    titleText: {
        fontSize: 30,
        color: Colors.text,
        fontWeight: 'bold',
    },
    text: {
        fontSize: 27,
        color: Colors.text,
        fontWeight: 'bold',
    },
    itemCard: {
        backgroundColor: Colors.button,
        padding: 15,
        borderRadius: 8,
        marginBottom: 10,
        width: '100%',
        height: 80,
        justifyContent: 'center',
    },
});