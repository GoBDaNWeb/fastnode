import Icon from '@Shared/ui/icon';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const ServiceItem = ({ children, status, bem = {} }) => {
	const cn = 'serviceitem';
	const [cnfull] = useBEM({ cn, bem });

	const statusCollation = {
		on: 'on',
		pending: 'pending',
		off: 'off'
	};

	return (
		<div className={`${cnfull}`} data-status={statusCollation[status]}>
			<div className={`${cn}__caption`}>{children}</div>
			<div className={`${cn}__item-value`}>
				<Icon icon={`status-${statusCollation[status]}`} />
			</div>
		</div>
	);
};

export default ServiceItem;
