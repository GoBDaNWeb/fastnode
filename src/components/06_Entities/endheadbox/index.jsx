import Icon from '@Shared/ui/icon';
import Image from '@Shared/ui/image';

import { useTranslation } from 'react-i18next';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const EndHeadBox = ({
	children,
	title,
	brand,
	brandCustom,
	status,
	statusDescription,
	bem = {}
}) => {
	const cn = 'endheadbox';
	const [cnfull] = useBEM({ cn, bem });
	const { t } = useTranslation();

	const statusCollation = {
		active: 'active',
		created: 'created',
		canceled: 'canceled',
		paid: 'paid',
		unpaid: 'unpaid'
		// off: 'off'
	};
	/*
	CREATED - создан, ожидает оплаты
	PAID - оплачен, ожидание выдачи эндпоинтов нами
	ACTIVE - заказ активен, эндпоинты выданы
	UNPAID - заказ истёк, оплаты нету
	CANCELED - заказ так и не оплатили, терминальная стадия
	*/
	const brandPrepared = String(brand).toLowerCase();
	return (
		<div className={`${cnfull}`}>
			{brand && (
				<div className={`${cn}__start`}>
					<div className={`${cn}__brandbar`}>
						<div className={`${cn}__brand`}>
							{!brandCustom ? (
								<Icon svg={`logo-${brandPrepared}`} />
							) : (
								<Image
									store={brandCustom ? 'custom' : null}
									src={brandCustom}
									alt={title}
								/>
							)}
						</div>
					</div>
				</div>
			)}
			<div className={`${cn}__body`}>
				{title && <div className={`${cn}__titlebar`}>{title}</div>}

				{children && <div className={`${cn}__mainbar`}>{children}</div>}
				{status && (
					<div className={`${cn}__statusbar`}>
						<span className={`${cn}__status-label`}>
							{t('dashboard.label.status')}:
						</span>
						<div
							className={`${cn}__status-value`}
							data-status={statusCollation[String(status).toLowerCase()]}
						>
							{t(
								`dashboard.status.${
									statusCollation[String(status).toLowerCase()]
								}`
							)}
						</div>
					</div>
				)}
				{statusDescription && (
					<div className={`${cn}__statusbar`}>
						<div
							className={`${cn}__status-description`}
							data-status={statusCollation[String(status).toLowerCase()]}
						>
							{statusDescription}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default EndHeadBox;
