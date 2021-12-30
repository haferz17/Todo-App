import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View, Alert } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { handleChangeDataAction } from "../../redux/actions/todoAction";
import AppStyles from '../../config/style';
import { Close, CheckMark, Trash } from '../../config/images';
import { FloatButton, Header, FormInput } from '../../components/atoms';
import { handleCreateData, handleDeleteData, handleUpdateData } from '../../utils/ConstrucData';

const { color, margin } = AppStyles;

const FormTodo = (props) => {
    const { type, category, item } = props.route.params
    const [isShowCategory, setShowCategory] = useState(false)
    const [title, setTitle] = useState(item.title)
    const [note, setNote] = useState(item.note)
    const [pickedCategory, setPickedCategory] = useState(category || item.category)
    const { studyData, workData, lastId } = useSelector(state => state.todo)
    const dispatch = useDispatch()

    const onChangeTitle = (text) => setTitle(text)
    const onChangeNote = (text) => setNote(text)
    const handlePickCategory = (text) => {
        text !== pickedCategory && setPickedCategory(text)
        setShowCategory(false)
    }
    const hasWhiteSpace = (text) => {
        return /^\s/.test(text);
    }
    const handleCreate = (data, newItem, categoryData) => {
        const newData = handleCreateData(data, newItem, lastId)
        dispatch(handleChangeDataAction(newData, categoryData, lastId + 1))
    }
    const handleUpdate = (data, newItem, categoryData) => {
        const isCategoryChanged = item.category !== pickedCategory
        const previousData = {
            id: item.id,
            data: item.category == 'Study' ? studyData : workData
        }

        const { newData, newPreData } = handleUpdateData(data, isCategoryChanged, newItem, previousData, lastId)
        dispatch(handleChangeDataAction(newData, categoryData, lastId))

        if (isCategoryChanged) {
            const preCategoryData = item.category == 'Study' ? 'studyData' : 'workData'
            dispatch(handleChangeDataAction(newPreData, preCategoryData, lastId + 1))
        }
    }
    const handleSubmit = () => {
        if (title && pickedCategory && !hasWhiteSpace(title)) {
            const data = pickedCategory == 'Study' ? studyData : workData
            const categoryData = pickedCategory == 'Study' ? 'studyData' : 'workData'
            const newItem = {
                ...item,
                title,
                category: pickedCategory,
                note
            }

            if (type == 'create') {
                handleCreate(data, newItem, categoryData)
            } else if (type == 'update') {
                handleUpdate(data, newItem, categoryData)
            }

            props.navigation.goBack()
        } else {
            alert('Incomplete data or free text containing whitespace')
        }
    }
    const doConfirmDelete = () => {
        Alert.alert(
            "Delete Todo",
            "Are you sure?",
            [
                { text: "Cancel" },
                { text: "OK", onPress: () => handleDelete() }
            ],
        );
    }
    const handleDelete = () => {
        const data = item.category == 'Study' ? studyData : workData
        const categoryData = item.category == 'Study' ? 'studyData' : 'workData'
        const newData = handleDeleteData(data, item.id)
        dispatch(handleChangeDataAction(newData, categoryData, lastId))
        props.navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="transparent" barStyle="dark-content" />
            <Header
                title={type == 'create' ? 'New Todo' : 'Edit Todo'}
                theme="light"
                rightItem={{
                    icon: Close,
                    onPress: () => props.navigation.goBack()
                }}
            />
            <View style={styles.mainContent}>
                <FormInput
                    type="title"
                    value={title}
                    onChangeText={onChangeTitle}
                    disabled={item.completed}
                />
                <FormInput
                    type="category"
                    isShowCategory={isShowCategory}
                    onPress={() => setShowCategory(!isShowCategory)}
                    pickedCategory={pickedCategory}
                    onPressCancel={() => setPickedCategory("")}
                    onPickCategory={(text) => handlePickCategory(text)}
                    disabled={item.completed ? true : type == 'update' ? false : category}
                />
                <FormInput
                    type="note"
                    value={note}
                    onChangeText={onChangeNote}
                    disabled={item.completed}
                />
            </View>
            {!item.completed &&
                <FloatButton
                    icon={CheckMark}
                    onPress={handleSubmit}
                />
            }
            {type == 'update' &&
                <FloatButton
                    icon={Trash}
                    onPress={doConfirmDelete}
                    style={{ left: !item.completed ? margin.horizontal : null, backgroundColor: 'tomato' }}
                />
            }
        </SafeAreaView>
    );
};

export default FormTodo;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.light
    },
    mainContent: {
        paddingHorizontal: margin.horizontal
    },
})