import { createSlice } from '@reduxjs/toolkit';

import isEqual from 'lodash/isEqual';
import isObject from 'lodash/isObject';

const LS_KEY_STATS_SETTINGS = 'statsSettings';

const settingsDefault = {
	blockchain: { label: '', value: '' },
	period: { label: '', value: '' },
	stats_type: { label: 'All', value: 'all' }
};
let _lsSettings;
try {
	_lsSettings = JSON.parse(localStorage.getItem(LS_KEY_STATS_SETTINGS));
} catch (error) {
	_lsSettings = settingsDefault;
	localStorage.setItem(LS_KEY_STATS_SETTINGS, JSON.stringify(settingsDefault));
}
const lsSettings = isObject(_lsSettings) ? _lsSettings : settingsDefault;
const initialState = {
	settings: lsSettings ?? settingsDefault,
	savedSettings: lsSettings ?? settingsDefault
};

export const statsSlice = createSlice({
	name: 'stats',
	initialState,
	reducers: {
		setOne: (state, item) => {
			if (isEqual(state.settings[item.payload.name], item.payload.value)) {
				return;
			}
			state.settings[item.payload.name] = item.payload.value;
			const settingsPrepared = JSON.stringify(state.settings);
			localStorage.setItem(LS_KEY_STATS_SETTINGS, settingsPrepared);
		},
		setAll: (state, item) => {
			if (isEqual(state.settings, item.payload)) {
				return;
			}
			state.settings = item.payload;
			const settingsPrepared = JSON.stringify(state.settings);
			localStorage.setItem(LS_KEY_STATS_SETTINGS, settingsPrepared);
		},
		saveSettings: (state, item) => {
			if (isEqual(state.savedSettings, state.settings)) {
				return;
			}
			state.savedSettings = state.settings;
			const settingsPrepared = JSON.stringify(state.savedSettings);
			localStorage.setItem(LS_KEY_STATS_SETTINGS, settingsPrepared);
		}
	}
});
export const { reducer: statsReducer, actions: statsActions } = statsSlice;
