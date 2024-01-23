import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { mainApi } from './mainApi';
import { authSlice } from './slice/authSlice';
import { dashboardSlice } from './slice/dashboardSlice';
import { dialogSlice } from './slice/dialogSlice';
import { fbSlice } from './slice/fbSlice';
import { nodeCfgSlice } from './slice/nodeCfgSlice';
import { schemeSlice } from './slice/schemeSlice';
import { statsSlice } from './slice/statsSlice';
import { userSlice } from './slice/userSlice';

const rootReducer = combineReducers({
	[authSlice.name]: authSlice.reducer,
	[userSlice.name]: userSlice.reducer,
	[statsSlice.name]: statsSlice.reducer,
	[fbSlice.name]: fbSlice.reducer,
	[dialogSlice.name]: dialogSlice.reducer,
	[schemeSlice.name]: schemeSlice.reducer,
	[nodeCfgSlice.name]: nodeCfgSlice.reducer,
	[dashboardSlice.name]: dashboardSlice.reducer,
	//
	[mainApi.reducerPath]: mainApi.reducer
});

export const setupStore = () => {
	return configureStore({
		reducer: rootReducer,
		middleware: getDefaultMiddleware =>
			getDefaultMiddleware().concat(mainApi.middleware)
	});
};
