import { ENDPOINTS, LS_KEYS } from '@api/api.constants';

import { mainApi } from './mainApi';

mainApi.enhanceEndpoints({
	addTagTypes: ['Stats']
});
export const statsApi = mainApi.injectEndpoints({
	endpoints: build => ({
		getStats: build.query({
			query: ({ dedicated = '', period = '' }) => ({
				url: `${ENDPOINTS.DEDICATED_STATS}/?dedicated_server=${dedicated}&period=${period}`,
				headers: {
					'x-auth-token': localStorage.getItem(LS_KEYS.AUTH_HASH)
				}
			}),
			transformResponse: (response, meta, arg) => {
				const rps_stats = {
					label: 'RPS',
					data: response?.result?.rps_stats?.axis_data
				};
				const total_requests_stats = {
					label: 'Total Requests',
					data: response?.result?.stats?.axis_data
				};

				const rps_now = response?.result?.stats?.rps_now;

				return {
					axis_data: {
						all: [total_requests_stats, rps_stats],
						total_requests: [total_requests_stats],
						rps: [rps_stats]
					},
					rps_now
				};
			},
			transformErrorResponse: (response, meta, arg) => {
				return response?.data?.result?.message;
			},
			providesTags: ['Stats']
		})
	})
});
