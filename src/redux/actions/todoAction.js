import { GetListTodo, HandleCheckTodo, HandleDndTodo, HandleChangeData } from '../../config/actionType';

export const getListTodoAction = () => {
    return {
        type: GetListTodo,
    }
}

export const handleCheckTodoAction = (data, category) => {
    return {
        type: HandleCheckTodo,
        value: {
            data,
            category
        }
    }
}

export const handleDndTodoAction = (data, category) => {
    return {
        type: HandleDndTodo,
        value: {
            data,
            category
        }
    }
}

export const handleChangeDataAction = (data, category, lastId) => {
    return {
        type: HandleChangeData,
        value: {
            data,
            category,
            lastId
        }
    }
}