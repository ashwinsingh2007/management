import { call, put, takeEvery } from 'redux-saga/effects';
import {
  getUserDataSliceStore,
  saveUserDataSliceStore,
  saveTaskDataSliceStore,
  getTaskDataSliceStore,
  updateTaskDataSliceStore,
  deleteTaskDataSliceStore,
} from '@/store/slices/applicationSlice';

import axiosInstance from '@/store/axiosInstance'

function* fetchDataSaga() {
  try {
    console.log("REACHED HERE")
    const data = yield call(() => {
      // Replace this with your data fetching logic
      return axiosInstance.get("/users")
      // fetch('/api/data').then((response) => response.json());
    });
    console.log(":::data:::", data)
    yield put(saveUserDataSliceStore.actions.saveUserDataSuccess(data));
  } catch (error) {
    console.log(":::error:::", error)
    yield put(saveUserDataSliceStore.actions.saveUserDataFailure(error.message));
  }
}

function* saveUserDataSliceSaga({payload}) {
  try {
    console.log("REACHED HERE", payload)
    const data = yield call(() => {
      return axiosInstance.post("/auth/register", payload.userInfo)
    });
    console.log(":::data:::", data)
    localStorage.setItem("token", data.data.tokens.access.token)
    yield put(saveUserDataSliceStore.actions.saveUserDataSuccess(data));
  } catch (error) {
    console.log(":::error:::", error)
    yield put(saveUserDataSliceStore.actions.saveUserDataFailure(error.message));
  }
}

function* saveTaskDataSliceSaga({payload}) {
  try {
    console.log("REACHED HERE", payload)
    const data = yield call(() => {
      return axiosInstance.post("/task", {
        "title": payload.title,
        "description": payload.description,
        "status": payload.status,
      })
    });
    yield put(getTaskDataSliceStore.actions.getTaskDataRequest());
    yield put(saveTaskDataSliceStore.actions.saveTaskDataSuccess(data));
  } catch (error) {
    console.log(":::error:::", error)
    yield put(saveTaskDataSliceStore.actions.saveTaskDataSuccess(error.message));
  }
}

function* updateTaskDataSliceSaga({payload}) {
  try {
    console.log("REACHED HERE", payload)
    const data = yield call(() => {
      return axiosInstance.put("/task", {
        "title": payload.title,
        "description": payload.description,
        "status": payload.status,
        "taskId": payload.taskId
      })
    });
    yield put(getTaskDataSliceStore.actions.getTaskDataRequest());
    yield put(updateTaskDataSliceStore.actions.updateTaskDataSuccess(data));
  } catch (error) {
    console.log(":::error:::", error)
    yield put(updateTaskDataSliceStore.actions.updateTaskDataFailure(error.message));
  }
}

function* getTaskDataSliceSaga({payload}) {
  try {
    console.log("REACHED HERE", payload)
    const data = yield call(() => {
      return axiosInstance.get("/task")
    });
    yield put(getTaskDataSliceStore.actions.getTaskDataSuccess(data));
  } catch (error) {
    console.log(":::error:::", error)
    yield put(getTaskDataSliceStore.actions.getTaskDataFailure(error.message));
  }
}

function* deleteTaskDataSliceSaga({payload}) {
  try {
    console.log("REACHED HERE", payload)
    const data = yield call(() => {
      return axiosInstance.delete("/task", {
        params: {"taskId": payload.taskId}
      })
    });
    yield put(getTaskDataSliceStore.actions.getTaskDataRequest());
    yield put(deleteTaskDataSliceStore.actions.deleteTaskDataSuccess(data));
  } catch (error) {
    console.log(":::error:::", error)
    yield put(deleteTaskDataSliceStore.actions.deleteTaskDataFailure(error.message));
  }
}

function* watchApplicationData() {
  yield takeEvery(getUserDataSliceStore.actions.fetchDataRequest.type, fetchDataSaga);
  yield takeEvery(saveUserDataSliceStore.actions.saveUserDataRequest.type, saveUserDataSliceSaga);
  yield takeEvery(saveTaskDataSliceStore.actions.saveTaskDataRequest.type, saveTaskDataSliceSaga);
  yield takeEvery(getTaskDataSliceStore.actions.getTaskDataRequest.type, getTaskDataSliceSaga);
  yield takeEvery(updateTaskDataSliceStore.actions.updateTaskDataRequest.type, updateTaskDataSliceSaga);
  yield takeEvery(deleteTaskDataSliceStore.actions.deleteTaskDataRequest.type, deleteTaskDataSliceSaga);
}

export default watchApplicationData;
