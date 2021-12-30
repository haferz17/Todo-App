import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import AppStyles from '../../../config/style';
import { hp, wp } from '../../../utils/Responsive';

const { color, font, fontColor, fontSize, margin } = AppStyles;

const CardCategory = ({ icon, name, totalTodo }) => {
    return (
        <View style={styles.headerContent}>
            <Image source={icon} style={styles.icon} />
            <View>
                <Text style={styles.titleHeader}>{name}</Text>
                <Text style={styles.task}>{`(${totalTodo} Todo)`}</Text>
            </View>
        </View>
    );
};

export default CardCategory;

const styles = StyleSheet.create({
    headerContent: {
        backgroundColor: color.light,
        marginTop: '7%',
        marginHorizontal: margin.horizontal,
        paddingVertical: hp(2),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: hp(1),
        flexDirection: 'row',
    },
    icon: {
        height: hp(5.5),
        resizeMode: 'contain',
        marginHorizontal: -wp(4),
    },
    titleHeader: {
        color: fontColor.black,
        fontSize: fontSize.semiLarge,
        fontFamily: font.bold,
        textAlign: 'center'
    },
    task: {
        color: fontColor.primary,
        fontSize: fontSize.medium,
        fontFamily: font.bold,
        textAlign: 'center'
    },
})