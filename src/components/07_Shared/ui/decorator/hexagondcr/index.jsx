import useBEM from '@hooks/useBEM';

import './_init.scss';

const HexagonDcr = ({ variant, bem = {} }) => {
	const cn = 'hexagondcr';
	const [cnfull] = useBEM({ cn, bem });
	// const _variant = Number(variant);

	return (
		<div className={`${cnfull} decorator`} data-variant={variant}>
			{variant === 'intro' && (
				<>
					<div className={`${cnfull}__a`}></div>
					<div className={`${cnfull}__b`}></div>
				</>
			)}
			{variant === 'auth' && (
				<>
					<div className={`${cnfull}__a`}></div>
					<div className={`${cnfull}__b`}></div>
				</>
			)}
		</div>
	);
};

export default HexagonDcr;
