import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	homeLoaded: false,
	previousHash: '',
	received: {},
	prepared: {
		apikeys: {},
		dedicated_servers: {},
		invoices: []
	}
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setHomeLoaded: (state, item) => {
			localStorage.setItem('homeLoaded', item.payload);
			state.homeLoaded = item.payload;
		},
		setPreviousHash: (state, item) => {
			localStorage.setItem('previousHash', item.payload);
			state.previousHash = item.payload;
		},
		saveData: (state, item) => {
			state.received = item.payload;
			state.prepared.apikeys = item.payload.apikeys.map(el => ({
				label: el.name,
				value: el.apikey
			}));
			let tempInvoices = [];
			tempInvoices = item.payload.invoices.map((el, index) => ({
				id: index + 1,
				type:
					el.is_manual === undefined
						? 'unknown'
						: el.is_manual === true
						? 'manual'
						: 'auto',
				coinbase: `${el.payment.coinbase_id}`,
				payment_url: el.payment.coinbase_url,
				date: el.created_at,
				message: `${el.message} Fastnode DedicID: ${el.dedicated_server_name}`,
				status: el.status,
				amount: el.amount
			}));

			state.prepared.invoices = tempInvoices;
		}
	}
});
export const { reducer: userReducer, actions: userActions } = userSlice;
