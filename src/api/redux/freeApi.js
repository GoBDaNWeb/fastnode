import { ENDPOINTS } from '@api/api.constants';

import { mainApi } from './mainApi';

export const freeApi = mainApi.injectEndpoints({
	endpoints: build => ({
		feedbackSend: build.mutation({
			query: body => ({
				body,
				url: ENDPOINTS.CONTACT,
				method: 'POST',
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
