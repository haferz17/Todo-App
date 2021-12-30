import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import AppStyles from '../../../config/style';
import { hp } from '../../../utils/Responsive';

const { color, font, fontColor, fontSize } = AppStyles;

const TabBar = ({ data, onPress, activeTab }) => {
    return (
        <View style={styles.tabContainer}>
            {data.map((item, index) => {
                return (
                    <TouchableOpacity
                        key={item.id}
                        style={styles.buttonTab(index)}
                        onPress={() => onPress(item.id)}>
                        <Text style={styles.buttonText(item.id == activeTab)}>{item.text}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    );
};

export default TabBar;

const styles = StyleSheet.create({
    tabContainer: {
        width: '100%',
        flexDirection: 'row',
        backgroundColor: color.light,
        marginVertical: hp(2),
        borderRadius: hp(1)
    },
    buttonTab: (index) => ({
        flex: index == 0 ? 1 : index == 1 ? 2 : 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(2),
        borderLeftWidth: index !== 0 ? 1.5 : 0,
        borderColor: color.lightGrey
    }),
    buttonText: (active) => ({
        color: !active ? fontColor.grey : fontColor.black,
        fontSize: fontSize.extraMedium,
        fontFamily: font.bold,
        ...active ? {
            textShadowColor: 'rgba(0, 0, 0, 0.75)',
            textShadowOffset: { width: -0.5, height: 0.5 },
            textShadowRadius: 2
        } : {}
    })
})