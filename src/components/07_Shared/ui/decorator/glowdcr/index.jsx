import useBEM from '@hooks/useBEM';

import './_init.scss';

const GlowDcr = ({ variant, bem = {} }) => {
	const cn = 'glowdcr';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<div className={`${cnfull} decorator`} data-variant={variant}>
			<div className={`${cn}__helper`}>
				<div className={`${cnfull}__a`}></div>
				<div className={`${cnfull}__b`}></div>
			</div>
		</div>
	);
};

export default GlowDcr;
