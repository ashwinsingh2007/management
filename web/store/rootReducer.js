import { combineReducers } from '@reduxjs/toolkit';
import {
  getUserDataSliceStore, 
  saveUserDataSliceStore,
  saveTaskDataSliceStore,
  getTaskDataSliceStore,
  updateTaskDataSliceStore,
  deleteTaskDataSliceStore
} from './slices/applicationSlice';

const rootReducer = combineReducers({
  example: getUserDataSliceStore.reducer,
  saveUserDataSliceReducer: saveUserDataSliceStore.reducer,
  saveTaskDataSliceReducer: saveTaskDataSliceStore.reducer,
  getTaskDataSliceReducer: getTaskDataSliceStore.reducer,
  updateTaskDataSliceReducer: updateTaskDataSliceStore.reducer,
  deleteTaskDataSliceReducer: deleteTaskDataSliceStore.reducer,
});

export default rootReducer;
