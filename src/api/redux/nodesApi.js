import { ENDPOINTS, LS_KEYS, NODES_URL } from '@api/api.constants';

import { mainApi } from './mainApi';

mainApi.enhanceEndpoints({
	addTagTypes: ['Nodes']
});
export const nodesApi = mainApi.injectEndpoints({
	endpoints: build => ({
		getNodes: build.query({
			query: () => ({
				url: NODES_URL
			})
		})
	})
});
