import config from '@config';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

function usePageTitle(titleLocale, title) {
	const { t } = useTranslation();

	const prepared = titleLocale
		? t(`head.title.${titleLocale}`)
		: title
		? title
		: '';

	const pageTitle = prepared + (config.siteName ? ' | ' + config.siteName : '');
	useEffect(() => {
		document.title = pageTitle;
	}, [pageTitle]);
	return pageTitle;
}
export default usePageTitle;
