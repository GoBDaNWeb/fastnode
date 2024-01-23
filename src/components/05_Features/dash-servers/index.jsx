import { Description } from '@Shared/typography/description';
import { Heading } from '@Shared/typography/heading';
import Surface from '@Shared/typography/surface';
import { ComponentBox } from '@Shared/ui/componentbox';
import DashGrd from '@Shared/ui/layouts/dashgrd';
import { userApi } from '@api/redux';

import { useTranslation } from 'react-i18next';

import useBEM from '@hooks/useBEM';
import { useTrackQuery } from '@hooks/useTrackQuery';

import './_init.scss';

const DashServers = ({ children, id, bem = {} }) => {
	const cn = 'dashsimple';
	const [cnfull] = useBEM({ cn, bem });
	const { t } = useTranslation();

	const receivedUser = userApi.useGetUserQuery();

	const isReady = useTrackQuery(receivedUser);
	if (isReady) {
		return (
			<ComponentBox cn={cnfull} framed='1'>
				<DashGrd
					footbar={
						<>
							<Heading level={5}>
								{t('dashboard.heading.dedicated_servers')}
							</Heading>
							<Description>
								{t('dashboard.description.active_and_unpaid')}
							</Description>
						</>
					}
				>
					<Surface>{receivedUser?.data?.dedicated_servers?.length}</Surface>
				</DashGrd>
			</ComponentBox>
		);
	}
};

export default DashServers;
