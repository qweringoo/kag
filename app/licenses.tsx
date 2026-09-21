import React from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
// 先ほど生成したJSONを直接インポートする
import licensesData from "../assets/licenses.json";

// JSONの構造を型定義（キーがパッケージ名、値が詳細情報）
type LicenseInfo = {
    licenses?: string;
    repository?: string;
    publisher?: string;
    email?: string;
    licenseText?: string;
};

const licensesMap: Record<string, LicenseInfo> = licensesData;
const licensesList = Object.keys(licensesMap).map((key) => ({
    name: key,
    ...licensesMap[key],
}));

export default function LicensesScreen() {
    return (
        <View style={styles.container}>
            <FlatList
                data={licensesList}
                keyExtractor={(item) => item.name}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer}>
                        <Text style={styles.packageName}>{item.name}</Text>
                        <Text style={styles.licenseType}>
                            ライセンス: {item.licenses}
                        </Text>
                        {item.publisher ? (
                            <Text style={styles.publisher}>
                                作者: {item.publisher}
                            </Text>
                        ) : null}

                        {item.licenseText ? (
                            <ScrollView style={styles.textContainer} horizontal>
                                <Text style={styles.licenseText}>
                                    {item.licenseText}
                                </Text>
                            </ScrollView>
                        ) : null}
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: "#fff" },
    itemContainer: {
        marginBottom: 20,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    packageName: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 4,
        color: "#333",
    },
    licenseType: { fontSize: 14, color: "#666", marginBottom: 2 },
    publisher: { fontSize: 12, color: "#888", marginBottom: 6 },
    textContainer: {
        maxHeight: 100,
        backgroundColor: "#f5f5f5",
        padding: 8,
        borderRadius: 4,
    },
    licenseText: { fontFamily: "monospace", fontSize: 10, color: "#333" },
});
