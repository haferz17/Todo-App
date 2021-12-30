import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import AppStyles from '../../../config/style';
import { RightArrow } from '../../../config/images';
import { hp, wp } from '../../../utils/Responsive';
import DraggableFlatList from "react-native-draggable-flatlist";
import { TodoItem } from '../../atoms';

const { font, fontColor, fontSize } = AppStyles;

const SectionList = ({
    data = [],
    title,
    totalTodo,
    containerStyle,
    draggable = true,
    onPressNext,
    header = true,
    containerListStyle,
    onCheckItem,
    onDragEnd,
    onPressItem
}) => {
    const renderTodoList = ({ item, drag }) => {
        return (
            <TodoItem
                item={item}
                drag={draggable ? drag : null}
                onCheckItem={(item, id) => onCheckItem(item, id)}
                onPress={() => onPressItem(item)}
            />
        )
    }
    const listEmptyComponent = () => <TodoItem empty />

    return (
        <View style={containerStyle}>
            {header &&
                <View style={styles.header}>
                    <View style={styles.headerTitleContainer}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.task}>{`(${totalTodo} Todo)`}</Text>
                    </View>
                    <TouchableOpacity
                        style={styles.btnRightArrow}
                        onPress={onPressNext}>
                        <Image source={RightArrow} style={styles.rightArrow} />
                    </TouchableOpacity>
                </View>
            }
            <View style={styles.listContainer}>
                <DraggableFlatList
                    data={data}
                    renderItem={renderTodoList}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={containerListStyle}
                    showsVerticalScrollIndicator={false}
                    onDragEnd={onDragEnd}
                    ListEmptyComponent={listEmptyComponent}
                />
            </View>
        </View>
    );
};

export default SectionList;

const styles = StyleSheet.create({
    header: {
        height: hp(8),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        color: fontColor.black,
        fontSize: fontSize.semiLarge,
        fontFamily: font.bold,
        marginRight: wp(2)
    },
    task: {
        color: fontColor.primary,
        fontSize: fontSize.medium,
        fontFamily: font.bold
    },
    btnRightArrow: {
        paddingVertical: hp(1),
        paddingLeft: hp(4),
        paddingRight: hp(2),
        marginRight: -hp(2),
    },
    rightArrow: {
        height: hp(2.7),
        resizeMode: 'contain',
        marginRight: -wp(2.5),
    },
    listContainer: {
        flex: 1
    }
})