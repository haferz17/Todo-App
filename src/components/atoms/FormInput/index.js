import React from 'react';
import { Text, StyleSheet, View, TouchableOpacity, TextInput, Image } from 'react-native';
import AppStyles from '../../../config/style';
import { Study, Work, Cancel, Note, Category } from '../../../config/images';
import { hp } from '../../../utils/Responsive';

const { color, font, fontColor, fontSize } = AppStyles;
const category = [
    { id: 0, text: 'Study', icon: Study },
    { id: 1, text: 'Work', icon: Work },
];

const FormInput = ({
    type,
    onChangeText,
    isShowCategory,
    onPress,
    pickedCategory,
    onPressCancel,
    onPickCategory,
    disabled,
    value
}) => {
    switch (type) {
        case 'title':
            return (
                <View style={styles.textInputTitle}>
                    <TextInput
                        value={value}
                        placeholder="What are you planning?"
                        placeholderTextColor={color.placeholder}
                        style={styles.title}
                        multiline
                        maxLength={255}
                        returnKeyType="done"
                        blurOnSubmit
                        selectionColor={color.primary}
                        onChangeText={onChangeText}
                        editable={!disabled}
                    />
                </View>
            )
        case 'category':
            return (
                <>
                    <View style={styles.textInputCtg}>
                        <View style={styles.iconContainer}>
                            <Image source={Category} style={styles.ctgIcon} />
                        </View>
                        <TouchableOpacity
                            style={styles.btnCategory}
                            onPress={onPress}
                            disabled={disabled}>
                            <Text style={styles.ctgText(pickedCategory, disabled)}>{pickedCategory || 'Category'}</Text>
                        </TouchableOpacity>
                        {pickedCategory && !disabled ?
                            <TouchableOpacity onPress={onPressCancel}>
                                <Image source={Cancel} style={styles.cancel} />
                            </TouchableOpacity> : null
                        }
                    </View>
                    {isShowCategory &&
                        <View style={styles.ctgListContainer}>
                            {category.map(item => {
                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        style={styles.btnPickCtg}
                                        onPress={() => onPickCategory(item.text)}>
                                        <Image source={item.icon} style={styles.ctgPickIcon} />
                                        <Text style={styles.ctgPickText}>{item.text}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    }
                </>
            )
        case 'note':
            return (
                <View style={styles.textInputNote}>
                    <View style={styles.iconContainer}>
                        <Image source={Note} style={styles.noteIcon} />
                    </View>
                    <TextInput
                        value={value}
                        placeholder="Add note"
                        placeholderTextColor={color.placeholder}
                        style={styles.note}
                        multiline
                        maxLength={100}
                        returnKeyType="done"
                        blurOnSubmit
                        selectionColor={color.primary}
                        onChangeText={onChangeText}
                        editable={!disabled}
                    />
                </View>
            )
        default:
            return;
    }
};

export default FormInput;

const styles = StyleSheet.create({
    textInputTitle: {
        height: hp(20),
        borderBottomWidth: 1.5,
        borderColor: color.lightGrey
    },
    title: {
        fontFamily: font.regular,
        fontSize: fontSize.extraMedium + 2,
        height: '100%',
        justifyContent: "flex-start",
        textAlignVertical: 'top'
    },
    textInputCtg: {
        flexDirection: 'row',
        alignItems: 'center',
        height: hp(5),
        width: '100%',
        marginVertical: hp(1),
    },
    iconContainer: {
        width: '7%',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: '3%'
    },
    ctgIcon: {
        height: hp(3),
        resizeMode: 'contain',
    },
    btnCategory: {
        height: '100%',
        width: '82%',
        justifyContent: 'center',

    },
    ctgText: (text, disabled) => ({
        fontFamily: font.regular,
        fontSize: fontSize.extraMedium + 2,
        color: disabled ? fontColor.placeholder : text ? fontColor.black : fontColor.placeholder
    }),
    cancel: {
        height: hp(3),
        resizeMode: 'contain'
    },
    ctgListContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: hp(2),
        marginBottom: hp(1),
        borderBottomWidth: 1.5,
        borderColor: color.lightGrey
    },
    btnPickCtg: {
        alignItems: 'center',
        width: '10%',
        marginRight: '5%',
    },
    ctgPickIcon: {
        height: hp(3),
        resizeMode: 'contain',
        marginBottom: hp(0.5)
    },
    ctgPickText: {
        fontFamily: font.regular,
        fontSize: fontSize.semiMedium,
        color: fontColor.black
    },
    textInputNote: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        height: hp(10),
        marginVertical: hp(1),
    },
    noteIcon: {
        height: hp(3),
        resizeMode: 'contain',
    },
    note: {
        height: '100%',
        width: '85%',
        fontFamily: font.regular,
        fontSize: fontSize.extraMedium + 2,
        padding: 0,
        textAlignVertical: 'top'
    },
})