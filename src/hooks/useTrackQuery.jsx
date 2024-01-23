import { useEffect, useRef, useState } from 'react';

import isEmpty from 'lodash/isEmpty';

import useCustomAlert from './useCustomAlert';

export const useTrackQuery = (payload, key) => {
	const customAlert = useCustomAlert();
	const [ready, setReady] = useState(false);
	const [errorCounter, setErrorCounter] = useState(0);

	const instanceRef = useRef();

	useEffect(() => {
		if (payload.isLoading) {
			instanceRef.current = customAlert({
				type: 'loading'
			});
		}
	}, [payload]);
	useEffect(() => {
		if (payload.isError) {
			if (errorCounter < 1) {
				setErrorCounter(errorCounter + 1);

				instanceRef.current = customAlert({
					type: 'error',
					text: payload.error.message
				});
			}
		}
	}, [payload]);
	useEffect(() => {
		if (
			payload.isSuccess &&
			isEmpty(key ? payload?.data[key] : payload?.data)
		) {
			instanceRef.current = customAlert({
				type: 'nodata'
			});
		}
		if (
			payload.isSuccess &&
			!isEmpty(key ? payload?.data[key] : payload?.data)
		) {
			setReady(true);
			if (!isEmpty(instanceRef.current)) {
				instanceRef.current.close();
			}
		}
	}, [payload.isSuccess, payload.data, key]);

	useEffect(() => {
		if (!isEmpty(instanceRef.current)) {
			return () => {
				instanceRef.current.close();
			}; // Прячем при размонтировании
		}
	}, []);

	return ready;
};
