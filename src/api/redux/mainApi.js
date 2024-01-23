import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL } from '@api/api.constants';

export const mainApi = createApi({
	baseQuery: fetchBaseQuery({
		baseUrl: API_URL.MAIN
	}),
	endpoints: () => ({})
});
