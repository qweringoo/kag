import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { useLocalSearchParams } from 'expo-router';

export default function PhotoDetail() {
    const { uri } = useLocalSearchParams<{ uri: string }>();

    return (
        <View>
            <Image source={{ uri }} style={{ width: '100%', height: '100%' }} resizeMode='contain' />
        </View>
    );
}