import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const getUserDataSlice = createSlice({
  name: 'GetUserData',
  initialState,
  reducers: {
    fetchDataRequest(state) {
      state.loading = true;
    },
    fetchDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const saveUserDataSlice = createSlice({
  name: 'SaveUserData',
  initialState,
  reducers: {
    saveUserDataRequest(state) {
      state.loading = true;
    },
    saveUserDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    saveUserDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const saveTaskDataSlice = createSlice({
  name: 'SaveTaskData',
  initialState,
  reducers: {
    saveTaskDataRequest(state) {
      state.loading = true;
    },
    saveTaskDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    saveTaskDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const getTaskDataSlice = createSlice({
  name: 'GetTaskData',
  initialState,
  reducers: {
    getTaskDataRequest(state) {
      state.loading = true;
    },
    getTaskDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    getTaskDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const updateTaskDataSlice = createSlice({
  name: 'UpdateTaskData',
  initialState,
  reducers: {
    updateTaskDataRequest(state) {
      state.loading = true;
    },
    updateTaskDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    updateTaskDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

const deleteTaskDataSlice = createSlice({
  name: 'UpdateTaskData',
  initialState,
  reducers: {
    deleteTaskDataRequest(state) {
      state.loading = true;
    },
    deleteTaskDataSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    deleteTaskDataFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const getUserDataSliceStore = getUserDataSlice
export const saveUserDataSliceStore = saveUserDataSlice
export const saveTaskDataSliceStore = saveTaskDataSlice
export const getTaskDataSliceStore = getTaskDataSlice
export const updateTaskDataSliceStore = updateTaskDataSlice
export const deleteTaskDataSliceStore = deleteTaskDataSlice
