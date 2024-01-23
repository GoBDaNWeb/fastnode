import { useEffect, useRef, useState } from 'react';

import isEmpty from 'lodash/isEmpty';

import useCustomAlert from './useCustomAlert';

export const useTrackMutation = (
	payload,
	key,
	successAlert = false,
	successHtml
) => {
	const customAlert = useCustomAlert({});
	const optsRef = useRef(null);
	const instanceRef = useRef(null);
	const [ready, setReady] = useState(false);
	useEffect(() => {
		if (payload.isLoading) {
			optsRef.current = {
				type: 'loading'
			};
			instanceRef.current = customAlert({ ...optsRef.current });
		}
		if (payload.isError) {
			optsRef.current = {
				type: 'error',
				html: payload.error
			};
			instanceRef.current = customAlert({ ...optsRef.current });
		}
		if (payload.isSuccess) {
			if (isEmpty(key ? payload.data[key] : payload.data)) {
				optsRef.current = {
					type: 'nodata'
				};
				instanceRef.current = customAlert({ ...optsRef.current });
			}
			if (!isEmpty(key ? payload.data[key] : payload.data)) {
				if (!successAlert) {
					setReady(true);
					optsRef.current.close();
				} else if (successAlert === true) {
					setReady(true);
					optsRef.current = {
						type: 'success',
						html: successHtml ? successHtml : ''
					};
					instanceRef.current = customAlert({ ...optsRef.current });
				}
			}
		}
	}, [payload, key, successAlert, successHtml /* , customAlert */]);
	// * Из-за зависимости customALert он дважды появляется при success?

	return ready;
};
