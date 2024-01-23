import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import useCustomAlert from '@hooks/useCustomAlert';

import { metricRequestFreeTest } from '@config/metrics';

export const useRequestFreeTest = (request, requestState) => {
	const { t } = useTranslation();
	const customAlert = useCustomAlert();
	const $requestState = useRef(null);
	$requestState.current = requestState;

	const go = async (data, recaptcha) => {
		const body = {
			blockchain: String(data.blockchain.value).toLowerCase(),
			network: data.network.value,
			type: data.node_type,
			recaptcha_token: data.recaptcha_token
		};
		await request(body)
			.unwrap()
			.then(payload => {
				/*  Метрика */
				metricRequestFreeTest();
				/*  */
				customAlert({
					type: 'success',
					text: payload.message,
					timer: 0
				});
			})
			.catch(error => {
				if ($requestState.current.isError) {
					customAlert({
						type: 'error',
						text: $requestState.current.error
					});
				}
			});
	};
	return go;
};
