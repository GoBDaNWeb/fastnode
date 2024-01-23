import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { nodeCfgActions } from '@api/redux/slice/nodeCfgSlice';

import Swal from 'sweetalert2';

import { isErrorWithMessage, isFetchBaseQueryError } from '@extra/js/helpers';

import useCustomAlert from '@hooks/useCustomAlert';
import { useOpenExternalLink } from '@hooks/useOpenExternalLink';

import { metricRequestOrder } from '@config/metrics';

export const useSubmitNodeCfg = (receivedNodeCfg, dedicatedNew) => {
	const { t } = useTranslation();
	const customAlert = useCustomAlert();
	const dispatch = useDispatch();
	const openExternalLink = useOpenExternalLink();

	const priceT = t('common.price');
	const priceCap = priceT[0].toUpperCase() + priceT.substring(1);
	const discountT = t('common.discount');
	const discountCap = discountT[0].toUpperCase() + discountT.substring(1);
	const payMethodT = t('common.pay_method');
	const payMethodCap = payMethodT[0].toUpperCase() + payMethodT.substring(1);
	const successAlertRef = useRef();
	const externalLinkTimeoutRef = useRef();

	function go(data, reset) {
		const body = {
			blockchain: String(data.blockchain.value).toLowerCase(),
			network: data.network.value,
			type: data.node_type,
			apikey: data.api_key.value,
			months: data.billing_period.value,
			stripe: data.pay_method.value === 'stripe' ? true : false,
			recaptcha_token: data.recaptcha_token
		};
		const price = receivedNodeCfg.data.prices[body.type][body.months].price;
		const discount = receivedNodeCfg.data.prices[body.type][body.months].discount;
		const resetHelper = () => {
			dispatch(nodeCfgActions.resetSettings());
			reset();
		};
		const preparedHtml = `
			<div class='paylist'>
				<div class='paylist__slot'><div class='plaque'>blockchain:</div> <b>${body.blockchain}</b></div>
				<div class='paylist__slot'><div class='plaque'>network:</div> <b>${body.network}</b></div>
				<div class='paylist__slot'><div class='plaque'>type:</div> <b>${body.type}</b></div>
				<div class='paylist__slot'><div class='plaque'>${priceCap}:</div> <b>$${price}</b></div>
				<div class='paylist__slot'><div class='plaque'>${discountCap}:</div> <b>${discount}%</b></div>
				<div class='paylist__slot'><div class='plaque'>${payMethodCap}:</div> <b>${data.pay_method.label}</b></div>
			</div>`;

		customAlert({
			type: 'dedicated_new_confirm',
			html: preparedHtml
		}).then(async result => {
			if (result.isConfirmed) {
				await dedicatedNew(body)
					.unwrap()
					.then(payload => {
						/*  Метрика */
						metricRequestOrder();
						/*  */
						successAlertRef.current = customAlert({
							type: 'dedicated_new_external'
						});
						const extUrl =
							data.pay_method.value === 'stripe'
								? payload?.invoice?.payment?.stripe_url
								: payload?.invoice?.payment?.coinbase_url;

						externalLinkTimeoutRef.current = setTimeout(() => {
							openExternalLink(extUrl);
							clearTimeout(externalLinkTimeoutRef.current);
						}, Swal.getTimerLeft());

						resetHelper();
					})
					.catch(err => {
						if (isFetchBaseQueryError(err)) {
							const errMsg = 'error' in err ? err.error : JSON.stringify(err.data);
							customAlert({
								type: 'error',
								text: errMsg
							});
						} else if (isErrorWithMessage(err)) {
							customAlert({
								type: 'error',
								text: err.message
							});
						}
					});
			}
		});
	}
	return go;
	// reset();
};
