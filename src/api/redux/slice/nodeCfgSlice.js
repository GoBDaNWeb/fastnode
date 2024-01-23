import { createSlice } from '@reduxjs/toolkit';

import isEqual from 'lodash/isEqual';

const initialState = {
	received: {},
	prepared: {
		blockchains: [],
		networks: [],
		node_types: [
			{
				name: 'node_type',
				caption: 'full_node',
				description: 'full_node',
				value: 'full',
				disabled: true
			},
			{
				name: 'node_type',
				caption: 'archive_node',
				description: 'archive_node',
				value: 'archive',
				disabled: true
			}
		],
		billing_periods: [
			{ label: 1, value: 1, units: 'months' },
			{ label: 3, value: 3, units: 'months' },
			{ label: 6, value: 6, units: 'months' },
			{ label: 12, value: 12, units: 'months' }
		]
	},
	settings: {
		blockchain: '',
		network: '',
		node_type: '',
		billing_period: ''
	},
	savedSettings: {
		blockchain: '',
		network: '',
		node_type: '',
		billing_period: ''
	}
};

export const nodeCfgSlice = createSlice({
	name: 'nodeCfg',
	initialState,
	reducers: {
		saveData: (state, item) => {
			if (isEqual(state.received, item.payload)) {
				return;
			}
			state.received = item.payload;
			let tempBlockchains = [];
			for (let el of Object.values(item.payload.nodes)) {
				tempBlockchains.push({
					label: el.name,
					value: el.coin
				});
			}
			state.prepared.blockchains = tempBlockchains;
		},
		setBlockchain: (state, item) => {
			if (isEqual(state.settings.blockchain, item.payload)) {
				return;
			}
			state.settings.network = '';
			state.settings.node_type = '';
			state.settings.blockchain = item.payload;
			state.savedSettings = state.settings;

			let tempNetworks = [];
			for (let el of Object.values(state.received.nodes)) {
				if (el.name === state.settings.blockchain.label) {
					tempNetworks = el.networks.map(n => ({ label: n, value: n }));
				}
			}
			state.prepared.networks = tempNetworks;
			let tempNodeTypes = [];
			for (let el of Object.values(state.received.nodes)) {
				if (el.name === state.settings.blockchain.label) {
					tempNodeTypes = [
						{
							name: 'node_type',
							caption: 'full_node',
							description: 'full_node',
							value: 'full',
							disabled: false
						},
						{
							name: 'node_type',
							caption: 'archive_node',
							description: 'archive_node',
							value: 'archive',
							disabled: !el.has_archive_mode
						}
					];
				}
			}
			state.prepared.node_types = tempNodeTypes;
		},

		setSetting: (state, item) => {
			if (isEqual(state.settings[item.payload.name], item.payload.value)) {
				return;
			}
			state.settings[item.payload.name] = item.payload.value;
		},
		saveSettings: (state, item) => {
			if (isEqual(state.savedSettings, state.settings)) {
				return;
			}
			state.savedSettings = state.settings;
		},
		resetSettings: (state, item) => {
			state.savedSettings = {};
			state.settings = {};
		}
	}
});
export const { reducer: nodeCfgReducer, actions: nodeCfgActions } =
	nodeCfgSlice;
