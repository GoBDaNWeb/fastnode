import NodeInfo from '@Features//nodeinfo';
import { Heading } from '@Shared/typography/heading';
import ProlongDialog from '@Widgets/built-dialogs/prolongdlg';
import { userApi } from '@api/redux';
import { v4 as uuidv4 } from 'uuid';

import { useTranslation } from 'react-i18next';

import useBEM from '@hooks/useBEM';
import { useTrackQuery } from '@hooks/useTrackQuery';

import './_init.scss';

const DashEnd = ({ nodeName, footbarEnabled = true, bem = {} }) => {
	const receivedUser = userApi.useGetUserQuery();

	const _temp = receivedUser?.data?.dedicated_servers;
	const visibleServers = [..._temp];
	// .sort((a, b) => (a.status === 'PAID' ? 1 : -1))
	// .sort((a, b) => (b.status === 'UNPAID' ? 1 : -1))
	// .sort((a, b) => (a.status === 'CREATED' ? 1 : -1))
	// .sort((a, b) => (b.status === 'ACTIVE' ? 1 : -1));
	const cn = 'dashend';
	const [cnfull] = useBEM({ cn, bem });

	const isReady = useTrackQuery(receivedUser);
	const { t } = useTranslation();
	if (isReady) {
		if (visibleServers?.length > 0) {
			return (
				<div className={cnfull}>
					{visibleServers?.map(item => {
						return (
							<NodeInfo
								key={uuidv4()}
								extended={false}
								data={item}
								serverName={item.dedicated_server_name}
							/>
						);
					})}
					<ProlongDialog />
				</div>
			);
		} else {
			return (
				<Heading level={4} align={'center'}>
					{t('notify.no_active_servers')}
				</Heading>
			);
		}
	}
};

export default DashEnd;
