import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, View } from 'react-native';
import { useDispatch, useSelector } from "react-redux";
import { handleCheckTodoAction, handleDndTodoAction } from "../../redux/actions/todoAction";
import AppStyles from '../../config/style';
import { Back, Study, Plus, Work } from '../../config/images';
import { hp } from '../../utils/Responsive';
import { Header, TabBar, TopContentList, FloatButton } from '../../components/atoms';
import { SectionList } from '../../components/molecules';
import { FORM_TODO } from '../../config/navigation';
import { handleFilterTodoByCompleted, handleCheckTodoData } from '../../utils/ConstrucData';

const { color, margin } = AppStyles;
const tab = [
    { id: 0, text: 'All' },
    { id: 1, text: 'Uncompleted' },
    { id: 2, text: 'Completed' },
];

const TodoList = (props) => {
    const [activeTab, setActiveTab] = useState(0)
    const { category } = props.route.params
    const { studyData, workData } = useSelector(state => state.todo)
    const categoryIcon = category == 'Study' ? Study : Work
    const data = category == 'Study' ? studyData : workData
    const { uncompleted, completed } = handleFilterTodoByCompleted(data)
    const renderedData = activeTab == 0 ? data : activeTab == 1 ? uncompleted : completed
    const dispatch = useDispatch()

    const handleCheckTodo = (item, id) => {
        const categoryData = item == 'Study' ? 'studyData' : 'workData'
        const newData = handleCheckTodoData(data, id)
        dispatch(handleCheckTodoAction(newData, categoryData))
    }
    const handleDndTodo = ({ data }) => {
        const categoryData = category == 'Study' ? 'studyData' : 'workData'
        dispatch(handleDndTodoAction(data, categoryData))
    }
    const handleGoToForm = (type, item = {}) => {
        props.navigation.navigate(FORM_TODO, { type, category, item })
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar backgroundColor="transparent" translucent />
            <Header
                leftItem={{
                    icon: Back,
                    onPress: () => props.navigation.goBack()
                }}
            />
            <TopContentList
                icon={categoryIcon}
                categoryName={category}
                totalTodo={data.length}
            />
            <View style={styles.mainContent}>
                <TabBar
                    data={tab}
                    activeTab={activeTab}
                    onPress={(item) => setActiveTab(item)}
                />
                <SectionList
                    header={false}
                    data={renderedData}
                    containerStyle={{ height: '85%' }}
                    containerListStyle={{ paddingBottom: hp(27) }}
                    onCheckItem={handleCheckTodo}
                    onDragEnd={handleDndTodo}
                    onPressItem={(item) => handleGoToForm('update', item)}
                    draggable={activeTab == 0}
                />
            </View>
            <FloatButton
                icon={Plus}
                onPress={() => handleGoToForm('create')}
            />
        </SafeAreaView>
    );
};

export default TodoList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: color.primary,
    },
    mainContent: {
        backgroundColor: color.lightGrey,
        paddingHorizontal: margin.horizontal,
        alignItems: 'center',
    },

})