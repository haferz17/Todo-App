import {
    GetListTodoStart,
    GetListTodoSuccess,
    GetListTodoFailed,
    HandleCheckTodo,
    HandleDndTodo,
    HandleChangeData
} from '../../config/actionType';

const initialState = {
    isLoading: false,
    isSuccess: false,
    isError: false,
    studyData: [],
    workData: [],
    lastId: 0
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case GetListTodoStart:
            return {
                ...state,
                isLoading: true,
                isSuccess: false,
                isError: false,
            }
        case GetListTodoSuccess:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                studyData: action.data.studyData,
                workData: action.data.workData,
                lastId: action.data.lastId
            }
        case GetListTodoFailed:
            return {
                ...state,
                isLoading: false,
                isError: true,
            }
        case HandleCheckTodo:
            return {
                ...state,
                [action.value.category]: action.value.data
            }
        case HandleDndTodo:
            return {
                ...state,
                [action.value.category]: action.value.data
            }
        case HandleChangeData:
            return {
                ...state,
                [action.value.category]: action.value.data,
                lastId: action.value.lastId
            }
        default:
            return state
    }
}

export default todoReducer
