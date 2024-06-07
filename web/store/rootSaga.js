import { all } from 'redux-saga/effects';
import watchFetchData from '@/store/saga/applicationSaga';

function* rootSaga() {
  yield all([
    watchFetchData(),
  ]);
}

export default rootSaga;
