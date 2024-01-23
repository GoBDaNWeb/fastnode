import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { dashboardActions } from '@api/redux/slice/dashboardSlice';
import { dialogActions } from '@api/redux/slice/dialogSlice';

import Swal from 'sweetalert2';

import { isErrorWithMessage, isFetchBaseQueryError } from '@extra/js//helpers';

import useCustomAlert from '@hooks/useCustomAlert';
import { useOpenExternalLink } from '@hooks/useOpenExternalLink';

import { metricProlong } from '@config/metrics';

export const useSubmitProlong = (receivedNodeCfg, dedicatedProlong) => {
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
	const id = 'prolongDialog';
	const closeHelper = () => {
		dispatch(dashboardActions.resetProlongServer());
		dispatch(dialogActions.close(id));
	};
	function go(data, reset) {
		const submitBody = {
			dedicated_server: data.dedicated_server_name,
			months: data.billing_period.value,
			stripe: data.pay_method.value === 'stripe' ? true : false,
			recaptcha_token: data.recaptcha_token
		};
		const priceBody = {
			type: data.type,
			months: data.billing_period.value
		};
		const price = receivedNodeCfg.data.prices[priceBody.type][priceBody.months].price;
		const discount = receivedNodeCfg.data.prices[priceBody.type][priceBody.months].discount;
		const resetHelper = () => {
			reset();
		};

		const preparedHtml = `
			<div class='paylist'>
				<div class='paylist__slot'><div class='plaque'>blockchain:</div> <b>${data.blockchain}</b></div>
				<div class='paylist__slot'><div class='plaque'>network:</div> <b>${data.network}</b></div>
				<div class='paylist__slot'><div class='plaque'>type:</div> <b>${data.type}</b></div>
				<div class='paylist__slot'><div class='plaque'>${priceCap}:</div> <b>$${price}</b></div>
				<div class='paylist__slot'><div class='plaque'>${discountCap}:</div> <b>${discount}%</b></div>
				<div class='paylist__slot'><div class='plaque'>${payMethodCap}:</div> <b>${data.pay_method.label}</b></div>
			</div>`;
		customAlert({
			type: 'dedicated_new_confirm',
			title: t('alert.title.dedicated_prolong_confirm'),
			html: preparedHtml
		}).then(async result => {
			if (result.isConfirmed) {
				await dedicatedProlong(submitBody)
					.unwrap()
					.then(payload => {
						/*  Метрика */
						metricProlong();
						/*  */
						successAlertRef.current = customAlert({
							type: 'dedicated_new_external',
							title: t('alert.title.dedicated_prolong_external')
						});
						const extUrl =
							data.pay_method.value === 'stripe'
								? payload?.invoice?.payment?.stripe_url
								: payload?.invoice?.payment?.coinbase_url;

						externalLinkTimeoutRef.current = setTimeout(() => {
							openExternalLink(extUrl);
							clearTimeout(externalLinkTimeoutRef.current);
						}, Swal.getTimerLeft());
						closeHelper();
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
};
