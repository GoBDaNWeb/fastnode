import { useTranslation } from 'react-i18next';

import OfficeGrid from '@out/OfficeGrid';

import InvoicesCmp from '@Features//invoicescmp';

import Board from '@Shared/board';

import usePageTitle from '@hooks/usePageTitle';

const InvoicesPage = ({ titleLocale, title }) => {
	const { t } = useTranslation();
	usePageTitle(titleLocale, title);

	return (
		<OfficeGrid heading={t('invoices.heading')}>
			<Board>
				<InvoicesCmp />
				{/* inv */}
			</Board>
		</OfficeGrid>
	);
};

export default InvoicesPage;
