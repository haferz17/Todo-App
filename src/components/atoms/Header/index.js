import React from 'react';
import { TouchableOpacity, StyleSheet, View, Image, Text, StatusBar } from 'react-native';
import AppStyles from '../../../config/style';
import { hp } from '../../../utils/Responsive';

const { fontColor, font, fontSize, color, margin } = AppStyles;

const Header = ({ title, leftItem = {}, rightItem = {}, theme = "primary" }) => {
    const colorItem = theme == 'primary' ? color.light : color.black
    return (
        <View style={styles.headerNav}>
            <TouchableOpacity onPress={leftItem.onPress} style={styles.button}>
                <Image source={leftItem.icon} style={styles.iconLeft(colorItem)} />
            </TouchableOpacity>
            <Text style={styles.title(colorItem)}>{title}</Text>
            <TouchableOpacity onPress={rightItem.onPress} style={styles.button}>
                <Image source={rightItem.icon} style={styles.iconRight(colorItem)} />
            </TouchableOpacity>
        </View>
    );
};

export default Header;

const styles = StyleSheet.create({
    headerNav: {
        height: hp(8),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: margin.horizontal,
        marginTop: StatusBar.currentHeight
    },
    button: {
        width: '15%',
    },
    iconLeft: (color) => ({
        height: hp(5),
        resizeMode: 'contain',
        tintColor: color,
        alignSelf: 'flex-start'
    }),
    iconRight: (color) => ({
        height: hp(3),
        resizeMode: 'contain',
        tintColor: color,
        alignSelf: 'flex-end'
    }),
    title: (color) => ({
        color,
        fontSize: fontSize.semiLarge - 2,
        fontFamily: font.bold,
        textAlign: 'center'
    }),
})