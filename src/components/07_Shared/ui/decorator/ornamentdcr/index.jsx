import useBEM from '@hooks/useBEM';

import './_init.scss';

const OrnamentDcr = ({ variant, bem = {} }) => {
	const cn = 'ornamentdcr';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<div className={`${cnfull} decorator`} data-variant={variant}>
			{variant === 'nodebox' && (
				<div className={`${cn}__helper`}>
					<div className={`${cnfull}__a`}>
						<b></b>
					</div>
					<div className={`${cnfull}__b`}>
						<b></b>
					</div>
					<div className={`${cnfull}__c`}>
						<b></b>
					</div>
				</div>
			)}
		</div>
	);
};

export default OrnamentDcr;
