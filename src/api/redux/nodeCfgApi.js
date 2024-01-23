import { ENDPOINTS, LS_KEYS } from '@api/api.constants';

import { mainApi } from './mainApi';

mainApi.enhanceEndpoints({
	addTagTypes: ['NodeCfg']
});
export const nodeCfgApi = mainApi.injectEndpoints({
	endpoints: build => ({
		getData: build.query({
			query: name => ENDPOINTS.NODE_CONFIGURATOR,
			transformResponse: (response, meta, arg) => {
				return response.result;
			},
			transformErrorResponse: (response, meta, arg) => response.status,
			providesTags: ['NodeCfg']
		}),
		// /request/freerun
		dedicatedFree: build.mutation({
			query: body => ({
				url: ENDPOINTS.DEDICATED_FREE,
				headers: {
					'x-auth-token': localStorage.getItem(LS_KEYS.AUTH_HASH),
					'recaptcha-token': body.recaptcha_token ?? ''
				},
				method: 'POST',
				body
			}),
			transformResponse: (response, meta, arg) => response.result,
			transformErrorResponse: (response, meta, arg) => response.result?.message,
			invalidatesTags: ['User']
		}),
		dedicatedNew: build.mutation({
			query: body => ({
				url: ENDPOINTS.DEDICATED_NEW,
				headers: {
					'x-auth-token': localStorage.getItem(LS_KEYS.AUTH_HASH),
					'recaptcha-token': body.recaptcha_token ?? ''
				},
				method: 'POST',
				body
			}),
			transformResponse: (response, meta, arg) => response.result,
			transformErrorResponse: (response, meta, arg) => response.result?.message,
			invalidatesTags: ['User']
		}),
		dedicateProlong: build.mutation({
			query: body => ({
				url: ENDPOINTS.DEDICATED_PROLONG,
				headers: {
					'x-auth-token': localStorage.getItem(LS_KEYS.AUTH_HASH),
					'recaptcha-token': body.recaptcha_token ?? ''
				},
				method: 'POST',
				body
			}),
			transformResponse: (response, meta, arg) => response.result,
			transformErrorResponse: (response, meta, arg) => response.result?.message,
			invalidatesTags: ['User']
		})
	})
});
