import { useCallback, useEffect, useRef, useState } from 'react';

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';

export const useRecaptcha = action => {
	const [captchaToken, setCaptchaToken] = useState('');
	const [refreshReCaptcha, setRefreshReCaptcha] = useState(false);
	const { executeRecaptcha } = useGoogleReCaptcha();

	const refreshCaptcha = useCallback(async () => {
		setRefreshReCaptcha(r => !r);
	}, []);

	const handleReCaptchaVerify = useCallback(async () => {
		if (!executeRecaptcha) {
			console.log('Execute recaptcha not yet available');
			return;
		}
		const token = await executeRecaptcha(action);
		setCaptchaToken(token);
	}, [executeRecaptcha, action, refreshReCaptcha]);

	useEffect(() => {
		handleReCaptchaVerify();
	}, [handleReCaptchaVerify]);

	return { captchaToken, handleReCaptchaVerify, refreshCaptcha };
};
