import { ENDPOINTS, LS_KEYS } from '@api/api.constants';

import { mainApi } from './mainApi';

mainApi.enhanceEndpoints({
	addTagTypes: ['User']
});
export const userApi = mainApi.injectEndpoints({
	endpoints: build => ({
		getUser: build.query({
			query: () => ({
				url: ENDPOINTS.USER_PROFILE,
				headers: {
					'x-auth-token': localStorage.getItem(LS_KEYS.AUTH_HASH)
				}
			}),
			transformResponse: (response, meta, arg) => {
				const serversSelect = response?.result?.dedicated_servers
					.filter(item => item.status === ('ACTIVE' || 'PAID'))
					.map(item => ({
						label: item.readable_name,
						value: item.blockchain
					}));

				const invoices = response?.result?.invoices
					?.map((el, index) => ({
						id: index + 1,
						dedicated_server_name: el.dedicated_server_name,
						type: el.is_manual ? 'manual' : 'auto',
						payment_provider: el.payment.provider,
						payment_id: el.payment.coinbase_id ?? el.payment.stripe_id,
						payment_url: el.payment.coinbase_url ?? el.payment.stripe_url,
						date: el.created_at,
						message: `${el.message} Fastnode DedicID: ${el.dedicated_server_name}`,
						status: el.status,
						amount: el.amount
					}))
					.sort((a, b) => b.id - a.id);
				return {
					email: response?.result?.email,
					full_name: response?.result?.user,
					telegram: response?.result?.telegram,
					apikeys: response?.result?.apikeys?.map(el => ({
						label: el.name,
						value: el.apikey
					})),
					invoices: invoices,
					invoicesUnpaid: invoices.filter(item => item.status !== ('ACTIVE' || 'PAID')),
					dedicated_servers: response?.result?.dedicated_servers,
					dedicated_servers_select_data: serversSelect
					// dedicated_servers_select: [
					// 	{
					// 		label: 'All',
					// 		value: 'all'
					// 	},
					// 	...serversSelect
					// ]
				};
			},
			transformErrorResponse: (response, meta, arg) => {
				return response?.data?.result?.message;
			},
			providesTags: ['User']
		}),

		registration: build.mutation({
			query: body => ({
				body,
				url: ENDPOINTS.REGISTRATION,
				method: 'POST',
				headers: {
					'recaptcha-token': body.recaptcha_token ?? ''
				},
				extraOptions: body
			}),
			transformResponse: (response, meta, arg) => {
				localStorage.setItem(LS_KEYS.AUTH_ID, response.result.auth.auth_id);
				localStorage.setItem(LS_KEYS.AUTH_HASH, response.result.auth.auth_hash);
				return response;
			},
			transformErrorResponse: (response, meta, arg) => {
				return response.data.result.message;
			},
			invalidatesTags: ['User']
		}),
		login: build.mutation({
			query: body => ({
				body,
				url: ENDPOINTS.LOGIN,
				method: 'POST',
				headers: {
					'recaptcha-token': body.recaptcha_token ?? ''
				}
			}),
			transformResponse: (response, meta, arg) => {
				localStorage.setItem(LS_KEYS.AUTH_ID, response.result.auth.auth_id);
				localStorage.setItem(LS_KEYS.AUTH_HASH, response.result.auth.auth_hash);
				return response.result.auth;
			},
			transformErrorResponse: (response, meta, arg) => {
				return response.data.result.message;
			},
			invalidatesTags: ['User']
		}),
		updateUser: build.mutation({
			query: body => ({
				url: ENDPOINTS.USER_PROFILE_UPDATE,
				headers: {
					'x-auth-token': localStorage.getItem(LS_KEYS.AUTH_HASH),
					'recaptcha-token': body.recaptcha_token ?? ''
				},
				method: 'POST',
				body,
				extraOptions: body => body
			}),
			extraOptions: body => body,
			transformResponse: (response, meta, arg) => {
				return response;
			},
			transformErrorResponse: (response, meta, arg) => {
				return response?.data?.result?.message;
			},
			invalidatesTags: ['User']
		}),
		passwordForgot: build.mutation({
			query: body => ({
				url: ENDPOINTS.PASSWORD_FORGOT,
				method: 'POST',
				body,
				headers: {
					'recaptcha-token': body.recaptcha_token ?? ''
				}
			}),
			transformResponse: (response, meta, arg) => {
				return response;
			},
			transformErrorResponse: (response, meta, arg) => {
				return response?.data?.result?.message;
			}
		})
	})
});
