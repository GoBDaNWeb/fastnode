import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	currentScheme: localStorage.getItem('color-scheme') ?? 'auto'
};

export const schemeSlice = createSlice({
	name: 'scheme',
	initialState,
	reducers: {
		setScheme: (state, item) => {
			state.currentScheme = item.payload;
		}
	}
});
export const { reducer: schemeReducer, actions: schemeActions } = schemeSlice;
