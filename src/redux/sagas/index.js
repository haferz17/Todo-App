import { all } from 'redux-saga/effects';
import { todoWatcher } from './todoSaga';

const watchers = [
    todoWatcher(),
];

export default function* rootSaga() {
    yield all(watchers);
}