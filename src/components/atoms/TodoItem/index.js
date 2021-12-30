import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import AppStyles from '../../../config/style';
import { Check, Study, Work } from '../../../config/images';
import { hp } from '../../../utils/Responsive';

const { color, font, fontColor, fontSize } = AppStyles;

const TodoItem = ({ item, drag, onCheckItem, empty, onPress }) => {
    const categoryIcon = !empty && item.category == 'Study' ? Study : Work
    if (!empty) {
        return (
            <TouchableOpacity
                style={styles.todoCard}
                onPress={onPress}
                onLongPress={drag}
                activeOpacity={0.5}>
                <View style={styles.sideItem} >
                    <Image source={categoryIcon} style={styles.iconCategory} />
                </View>
                <View style={styles.todoTextContainer}>
                    <Text style={styles.todoTitle(item.completed)} numberOfLines={1}>{item.title}</Text>
                    {item.note && !item.completed &&
                        <Text style={styles.todoDesc} numberOfLines={1}>{item.note}</Text>
                    }
                </View>
                <View style={styles.sideItem}>
                    <TouchableOpacity style={styles.btnCheck} onPress={() => onCheckItem(item.category, item.id)}>
                        <Image source={Check} style={styles.check(item.completed)} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        );
    } else {
        return (
            <View style={styles.todoCard} >
                <Text style={styles.emptyText}>No Todo</Text>
            </View>
        )
    }
};

export default TodoItem;

const styles = StyleSheet.create({
    todoCard: {
        backgroundColor: color.light,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: hp(10),
        width: '100%'
    },
    sideItem: {
        height: '100%',
        width: '17%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    todoTextContainer: {
        height: '100%',
        width: '66%',
        justifyContent: 'center',
    },
    todoTitle: (completed) => ({
        color: fontColor.black,
        fontSize: fontSize.extraMedium,
        fontFamily: font.bold,
        marginBottom: hp(0.5),
        textDecorationLine: completed ? 'line-through' : 'none'
    }),
    todoDesc: {
        color: fontColor.grey,
        fontSize: fontSize.semiMedium,
        fontFamily: font.bold,
    },
    iconCategory: {
        height: '45%',
        width: '60%',
        resizeMode: 'contain',
    },
    btnCheck: {
        height: '60%',
        width: '70%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    check: (completed) => ({
        height: '80%',
        resizeMode: 'contain',
        tintColor: completed ? 'green' : color.grey
    }),
    emptyText: {
        color: fontColor.black,
        fontSize: fontSize.extraMedium,
        fontFamily: font.regular,
        textAlign: 'center',
        width: '100%',
    }
})