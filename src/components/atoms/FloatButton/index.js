import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { hp } from '../../../utils/Responsive';
import AppStyles from '../../../config/style';

const { color, margin } = AppStyles

const FloatButton = ({ icon, onPress, style }) => {
    return (
        <TouchableOpacity
            style={[styles.button, style]}
            onPress={onPress}
        >
            <Image source={icon} style={styles.icon} />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        height: hp(7.8),
        width: hp(7.8),
        borderRadius: hp(8),
        backgroundColor: color.primary,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: hp(3),
        right: margin.horizontal,
        elevation: 3,
    },
    icon: {
        height: hp(3.8),
        resizeMode: 'contain',
        tintColor: color.light
    }
})

export default FloatButton;