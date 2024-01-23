import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	data: JSON.parse(localStorage.getItem('fb')) ?? {},
	tempData: JSON.parse(localStorage.getItem('tempfb')) ?? {}
};

export const fbSlice = createSlice({
	name: 'fb',
	initialState,
	reducers: {
		getAll: (state, item) => {},
		saveAll: (state, item) => {
			localStorage.setItem('fb', JSON.stringify(item.payload.data));
			state.data = item.payload.data;

			// localStorage.setItem('tempfb', JSON.stringify(state.tempData));
		},
		saveTemp: (state, item) => {
			// localStorage.setItem('fb', JSON.stringify(item.payload.data));
			localStorage.setItem('tempfb', JSON.stringify(item.payload.data));
			state.tempData = item.payload.data;
			// state.data = item.payload.data;
		},
		clearTemp: (state, item) => {
			localStorage.removeItem('tempfb');
			state.tempData = {};
		},
		moveTempToAll: (state, item) => {
			localStorage.setItem('fb', JSON.stringify(state.tempData));
			state.data = state.tempData;
		},
		clearAll: (state, item) => {
			localStorage.removeItem('fb');
			state.data = {};
		}
	}
});
export const { reducer: fbReducer, actions: fbActions } = fbSlice;
