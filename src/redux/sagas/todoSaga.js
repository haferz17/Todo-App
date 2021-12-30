
import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import {
    GetListTodo,
    GetListTodoStart,
    GetListTodoSuccess,
    GetListTodoFailed,
} from '../../config/actionType';
import { GetListTodoApi } from '../../config/api';
import { createTodoListData } from '../../utils/ConstrucData';

function* getListTodo() {
    yield put({ type: GetListTodoStart });
    try {
        const res = yield axios.get(GetListTodoApi)
        const data = res.data.slice(0, 10)
        const newData = createTodoListData(data)
        yield put({ type: GetListTodoSuccess, data: newData });
    } catch (error) {
        yield put({ type: GetListTodoFailed });
    }
}

export function* todoWatcher() {
    yield takeLatest(GetListTodo, getListTodo);
}   