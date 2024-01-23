import { useTranslation } from 'react-i18next';

import useBEM from '@hooks/useBEM';

import './_init.scss';

function LangToggler({ bem = {} }) {
	const cn = 'langtoggler';
	const [cnfull] = useBEM({ cn, bem });

	const { t, i18n } = useTranslation();

	const handleChangeLanguage = language => {
		i18n.changeLanguage(language);
	};

	return (
		<div className={cnfull}>
			<button onClick={() => handleChangeLanguage('en')}>English</button>
			<button onClick={() => handleChangeLanguage('ru')}>Русский</button>
		</div>
	);
}
export default LangToggler;
