import { Tab } from '@headlessui/react';
import { useTranslation } from 'react-i18next';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const Tabbar = ({ defaultTab, endpoints, statistic, bem = {} }) => {
	const { t } = useTranslation();

	const cn = 'tabbar';
	const [cnfull] = useBEM({ cn, bem });
	return (
		<div className={`${cnfull}`}>
			<Tab.Group defaultIndex={defaultTab}>
				<Tab.List className={`${cn}__list`}>
					<Tab className={`${cn}__tab`}>
						<span>{t('tabbar.items.endpoints')}</span>
					</Tab>
					<Tab className={`${cn}__tab`}>
						<span>{t('tabbar.items.stats')}</span>
					</Tab>
				</Tab.List>
				<Tab.Panels className={`${cn}__panels`}>
					<Tab.Panel className={`${cn}__panel`}>{endpoints}</Tab.Panel>
					<Tab.Panel className={`${cn}__panel`}>{statistic}</Tab.Panel>
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
};

export default Tabbar;
