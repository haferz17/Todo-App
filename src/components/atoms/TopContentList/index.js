import React from 'react';
import { Text, StyleSheet, View, Image } from 'react-native';
import AppStyles from '../../../config/style';
import { hp, wp } from '../../../utils/Responsive';

const { color, font, fontColor, fontSize, margin } = AppStyles;

const TopContentList = ({ icon, categoryName, totalTodo }) => {
    return (
        <View style={styles.topContent}>
            <View style={styles.iconCategoryContainer}>
                <Image source={icon} style={styles.iconCategory} />
            </View>
            <View>
                <Text style={styles.categoryName}>{categoryName}</Text>
                <Text style={styles.task}>{`${totalTodo} Todo`}</Text>
            </View>
        </View>
    );
};

export default TopContentList;

const styles = StyleSheet.create({
    topContent: {
        marginHorizontal: margin.horizontal,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'center',
        paddingBottom: hp(4),
    },
    iconCategoryContainer: {
        height: hp(8),
        width: hp(8),
        borderRadius: hp(4),
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: color.light,
        marginRight: wp(3)
    },
    iconCategory: {
        height: hp(5),
        resizeMode: 'contain',
    },
    categoryName: {
        color: fontColor.light,
        fontSize: fontSize.extraLarge,
        fontFamily: font.bold,
    },
    task: {
        color: fontColor.light,
        fontSize: fontSize.semiLarge - 2,
        fontFamily: font.regular,
        textAlign: 'center'
    },
})