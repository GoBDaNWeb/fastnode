import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	openedIds: []
};

export const dialogSlice = createSlice({
	name: 'dialog',
	initialState,
	reducers: {
		open: (state, item) => {
			if (state.openedIds.some(dialog => dialog === item.payload)) {
				return;
			}
			state.openedIds = [...state.openedIds, item.payload];
		},
		close: (state, item) => {
			state.openedIds = state.openedIds.filter(
				dialog => dialog !== item.payload
			);
		},
		closeAll: (state, item) => {
			state.openedIds = [];
		}
	}
});
export const { reducer: dialogReducer, actions: dialogActions } = dialogSlice;
