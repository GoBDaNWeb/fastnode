import { useTranslation } from 'react-i18next';

import OfficeGrid from '@out/OfficeGrid';

import PersonalForm from '@Widgets/built-forms/personalform';

import Board from '@Shared/board';

import usePageTitle from '@hooks/usePageTitle';

const PersonalPage = ({ titleLocale, title }) => {
	const { t } = useTranslation();
	usePageTitle(titleLocale, title);

	return (
		<OfficeGrid heading={t('personal_account.heading')}>
			<Board>
				<PersonalForm />
			</Board>
		</OfficeGrid>
	);
};

export default PersonalPage;
