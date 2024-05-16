import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	nodes: []
};

export const nodesSlice = createSlice({
	name: 'nodes',
	initialState,
	reducers: {
		getNodes: (state, item) => {
			localStorage.setItem('homeLoaded', item.payload);
			state.homeLoaded = item.payload;
		}
	}
});
export const { reducer: nodesReducer, actions: nodesActions } = nodesSlice;
