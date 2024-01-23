import { LS_KEYS } from '@api/api.constants';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	id: localStorage.getItem(LS_KEYS.AUTH_ID) ?? null,
	hash: localStorage.getItem(LS_KEYS.AUTH_HASH) ?? null
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login: (state, item) => {
			state.id = localStorage.getItem(LS_KEYS.AUTH_ID) ?? null;
			state.hash = localStorage.getItem(LS_KEYS.AUTH_HASH) ?? null;
		},
		logout: (state, item) => {
			localStorage.removeItem(LS_KEYS.AUTH_ID);
			localStorage.removeItem(LS_KEYS.AUTH_HASH);
			state.id = null;
			state.hash = null;
		}
	}
});
export const { reducer: authReducer, actions: authActions } = authSlice;
