import { useTranslation } from 'react-i18next';

import { userApi } from '@api/redux';

import OfficeGrid from '@out/OfficeGrid';

import DashEnd from '@Features//dash-end';
import DashInvoices from '@Features//dash-invoices';
import DashServers from '@Features//dash-servers';
import DashServices from '@Features//dash-services';
import DashStart from '@Features//dash-start';

import Board from '@Shared/board';
import BoardGrd from '@Shared/ui/layouts/boardgrd';
import BoardsetGrd from '@Shared/ui/layouts/boardsetgrd';

import usePageTitle from '@hooks/usePageTitle';
import { useTrackQuery } from '@hooks/useTrackQuery';

const DashboardPage = ({ titleLocale, title }) => {
	const { t } = useTranslation();
	usePageTitle(titleLocale, title);

	const receivedUser = userApi.useGetUserQuery();

	const isReady = useTrackQuery(receivedUser);
	if (isReady) {
		return (
			<OfficeGrid
				heading={t('heading.welcome')}
				headingIcon={'👋'}
				headingSub={receivedUser?.data?.full_name}
			>
				<Board>
					<BoardGrd>
						<DashStart />
						<BoardsetGrd size={3}>
							<DashServers />
							<DashInvoices />
							<DashServices />
						</BoardsetGrd>
						<DashEnd />
					</BoardGrd>
				</Board>
			</OfficeGrid>
		);
	}
};

export default DashboardPage;
