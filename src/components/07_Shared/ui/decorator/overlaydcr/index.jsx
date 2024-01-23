import useBEM from '@hooks/useBEM';

import './_init.scss';

const OverlayDcr = ({ variant, bem = {} }) => {
	const cn = 'overlaydcr';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<div className={`${cnfull} decorator`} data-variant={variant}>
			{variant === '1' && (
				<>
					<div className={`${cnfull}__a`}></div>
					<div className={`${cnfull}__b`}></div>
				</>
			)}
		</div>
	);
};

export default OverlayDcr;
