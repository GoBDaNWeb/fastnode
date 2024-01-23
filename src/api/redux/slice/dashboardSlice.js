import { createSlice } from '@reduxjs/toolkit';

// import isNumber from 'lodash/isNumber';
// const LS_KEY_RATE_LIMIT = 'rate_limit';
// let _rateLimit = parseFloat(localStorage.getItem(LS_KEY_RATE_LIMIT));
// if (!_rateLimit) {
// 	_rateLimit = 60;
// 	localStorage.setItem(LS_KEY_RATE_LIMIT, _rateLimit);
// }
// const rateLimit = isNumber(_rateLimit) ? _rateLimit : 60;

//
const initialState = {
	received: {},
	prepared: {},
	// rateLimit: rateLimit, // !
	prolongServer: ''
};

export const dashboardSlice = createSlice({
	name: 'dashboard',
	initialState,
	reducers: {
		setStatsType: (state, item) => {
			state.statsType = item.payload;
		},
		// setRateLimit: (state, item) => {
		// 	state.rateLimit = item.payload;
		// 	localStorage.setItem(LS_KEY_RATE_LIMIT, item.payload);
		// },
		setProlongServer: (state, item) => {
			state.prolongServer = item.payload;
		},
		resetProlongServer: (state, item) => {
			state.prolongServer = '';
		}
	}
});
export const { reducer: dashboardReducer, actions: dashboardActions } =
	dashboardSlice;
