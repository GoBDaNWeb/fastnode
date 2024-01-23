import { Heading } from '@Shared/typography/heading';
import Surface from '@Shared/typography/surface';
import Button from '@Shared/ui/button';
import { ComponentBox } from '@Shared/ui/componentbox';
import DashGrd from '@Shared/ui/layouts/dashgrd';
import { userApi } from '@api/redux';

import { useTranslation } from 'react-i18next';

import useBEM from '@hooks/useBEM';
import { useTrackQuery } from '@hooks/useTrackQuery';

import './_init.scss';

const DashInvoices = ({ children, id, bem = {} }) => {
	const cn = 'dashsimple';
	const [cnfull] = useBEM({ cn, bem });
	const { t } = useTranslation();

	const receivedUser = userApi.useGetUserQuery();

	useTrackQuery(receivedUser);
	if (receivedUser.isSuccess) {
		return (
			<ComponentBox cn={cnfull} framed='1'>
				<DashGrd
					footbar={
						<>
							<Heading level={5}>
								{t('dashboard.heading.unpaid_invoices')}
							</Heading>
							<Button
								navTo='invoices'
								face={'plain'}
								// accent='secondary'
								icon={'arrow-ltr'}
								iconAlign={'end'}
								name={'go_to_invoices'}
							/>
						</>
					}
				>
					<Surface>{receivedUser?.data?.invoicesUnpaid?.length}</Surface>
				</DashGrd>
			</ComponentBox>
		);
	}
};

export default DashInvoices;
