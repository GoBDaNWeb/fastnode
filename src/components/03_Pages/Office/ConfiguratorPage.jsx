import { useTranslation } from 'react-i18next';

import OfficeGrid from '@out/OfficeGrid';

import ConfiguratorForm from '@Widgets/built-forms/configuratorform';

import Board from '@Shared/board';

import usePageTitle from '@hooks/usePageTitle';

const ConfiguratorPage = ({ titleLocale, title }) => {
	const { t } = useTranslation();

	usePageTitle(titleLocale, title);

	return (
		<OfficeGrid heading={t('node_configurator.heading')}>
			<Board>
				<ConfiguratorForm />
			</Board>
		</OfficeGrid>
	);
};

export default ConfiguratorPage;
