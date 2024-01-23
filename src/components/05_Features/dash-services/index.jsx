import ServiceBox from '@Entities/servicebox';
import ServiceItem from '@Entities/serviceitem';
import { ComponentBox } from '@Shared/ui/componentbox';
import { userApi } from '@api/redux';

import { useTranslation } from 'react-i18next';

import useBEM from '@hooks/useBEM';
import { useTrackQuery } from '@hooks/useTrackQuery';

import './_init.scss';

const DashServices = ({ children, id, bem = {} }) => {
	const cn = 'dashsimple';
	const [cnfull] = useBEM({ cn, bem });
	const { t } = useTranslation();
	const receivedUser = userApi.useGetUserQuery();
	const isReady = useTrackQuery(receivedUser);
	if (isReady) {
		return (
			<ComponentBox cn={cnfull} framed='1'>
				<ServiceBox headbar={t('dashboard.heading.services_status')}>
					<ServiceItem status={'on'}>
						{t('dashboard.item.dashboard')}
					</ServiceItem>
					<ServiceItem status={'on'}>{t('dashboard.item.billing')}</ServiceItem>
					<ServiceItem status={'on'}>
						{t('dashboard.item.nodes_gateway')}
					</ServiceItem>
				</ServiceBox>
			</ComponentBox>
		);
	}
};

export default DashServices;
