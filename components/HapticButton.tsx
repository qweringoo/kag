import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import * as Haptics from 'expo-haptics';

// 通常の TouchableOpacity のプロパティを引き継ぐ
interface HapticButtonProps extends TouchableOpacityProps {
    impact?: 'light' | 'medium' | 'heavy' | 'success';
}

export const HapticButton: React.FC<HapticButtonProps> = ({
    children,
    onPress,
    impact = 'medium',
    style,
    ...props
}) => {

    const handlePress = (event: any) => {
        // 振動の種類を選択
        switch (impact) {
            case 'light':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                break;
            case 'heavy':
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                break;
            case 'success':
                Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
                break;
            default:
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        }

        // 本来のクリック処理を実行
        if (onPress) {
            onPress(event);
        }
    };

    return (
        <TouchableOpacity style={style} onPress={handlePress} {...props}>
            {children}
        </TouchableOpacity>
    );
};