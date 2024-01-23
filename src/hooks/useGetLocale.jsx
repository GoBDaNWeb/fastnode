import { useTranslation } from 'react-i18next';

function useGetLocale([name, element, locale = {}]) {
	const { t } = useTranslation();
	const targetName = locale?.name ? locale?.name : name;
	const namespace = locale?.ns ? `${locale?.ns}.` : '';
	const part = locale?.prt ? `${locale?.prt}.` : '';
	const fstr = `${part}${namespace}${element}.${targetName}`;
	const localeValue = t(fstr);
	return [localeValue];
}
export default useGetLocale;
