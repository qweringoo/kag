import { Alert, StyleSheet, Text, View, FlatList, SectionList } from 'react-native';
import { Colors } from '../constants/Colors';
import * as Contacts from 'expo-contacts';
import { useEffect, useState } from 'react';
import { HapticButton } from '../components/HapticButton';
import { router } from 'expo-router';

export default function Address() {
    const [sections, setSections] = useState<{ title: string; data: Contacts.Contact[] }[]>([]);

    const openDetail = (name: string, phoneNumbers: Contacts.PhoneNumber[] | undefined) => {
        const addressData = { name: name, phoneNumbers: phoneNumbers };
        router.push({ pathname: '/address-detail', params: { data: JSON.stringify(addressData) } });
    };



    const getSectionTitle = (name: string): string => {
        if (!name) return '#';
        const firstChar = name.charAt(0);

        // 1. 英数字の判定 (A-Z)
        if (/[A-Za-z]/.test(firstChar)) return firstChar.toUpperCase();

        // 2. ひらがな・カタカナを「行」にマッピング
        if (/[あ-おア-オヴ]/.test(firstChar)) return 'あ';
        if (/[か-こカ-コガ-ゴ]/.test(firstChar)) return 'か';
        if (/[さ-そサ-ソザ-ゾ]/.test(firstChar)) return 'さ';
        if (/[た-とタ-トダ-ド]/.test(firstChar)) return 'た';
        if (/[な-のナ-ノ]/.test(firstChar)) return 'な';
        if (/[は-ほハ-ホバ-ボパ-ポ]/.test(firstChar)) return 'は';
        if (/[ま-もマ-モ]/.test(firstChar)) return 'ま';
        if (/[や-よヤ-ヨ]/.test(firstChar)) return 'や';
        if (/[ら-ろラ-ロ]/.test(firstChar)) return 'ら';
        if (/[わ-んワ-ン]/.test(firstChar)) return 'わ';

        // 3. 漢字や記号など、どうしても判定不能なもの
        return '#';
    };


    const generateSections = (sortedContacts: Contacts.Contact[]) => {
        const newSections = sortedContacts.reduce((acc, contact) => {
            // フリガナがあれば優先、なければ名前を使う
            const searchKey = contact.phoneticLastName || contact.phoneticFirstName || contact.name || '';
            const sectionTitle = getSectionTitle(searchKey);

            const section = acc.find(s => s.title === sectionTitle);
            if (section) {
                section.data.push(contact);
            } else {
                acc.push({ title: sectionTitle, data: [contact] });
            }
            return acc;
        }, [] as { title: string; data: Contacts.Contact[] }[]);

        const finalSections = newSections.sort((a, b) => {
            const order = "あかさたなはまやらわ";

            // 1. 「#」を常に一番最後に持っていく
            if (a.title === '#') return 1;
            if (b.title === '#') return -1;

            // 2. 両方が「あ〜わ」の行にある場合
            const indexA = order.indexOf(a.title);
            const indexB = order.indexOf(b.title);

            if (indexA !== -1 && indexB !== -1) {
                return indexA - indexB;
            }

            // 3. 片方が日本語、片方が英字などの場合（日本語を優先）
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;

            // 4. 両方が英字などの場合は、アルファベット順
            return a.title.localeCompare(b.title, 'en');
        });

        setSections(finalSections);
    };

    // 最後にセクション自体も「あかさたな順」にソートするのを忘れずに！

    useEffect(() => {
        const fetchContacts = async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if (status !== 'granted') {
                console.log('連絡先へのアクセス許可が必要です.');
                Alert.alert('⚠️ 権限エラー', '連絡先へのアクセスを許可してください.');
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
            generateSections(sortedContacts);

        };
        fetchContacts();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>電話帳</Text>
            {/* <FlatList
                data={contacts}
                renderItem={({ item, index }) => (
                    <HapticButton style={styles.itemCard} onPress={() => openDetail(item.name, item.phoneNumbers)}>
                        <Text style={styles.text}>{item.name}</Text>
                    </HapticButton>
                )}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={{ padding: 20 }}
                style={{ width: '100%' }}
            /> */}
            <SectionList
                sections={sections}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <HapticButton style={styles.itemCard} onPress={() => openDetail(item.name, item.phoneNumbers)}>
                        <Text style={styles.text}>{item.name}</Text>
                    </HapticButton>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                        <Text style={styles.text}>{title}</Text>
                    </View>
                )}
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
        fontSize: 27,
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
    sectionHeader: {
        backgroundColor: Colors.primary,
        padding: 10,
        marginTop: 20,
        width: '100%',
    },
});