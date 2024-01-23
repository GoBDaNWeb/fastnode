import useBEM from '@hooks/useBEM';

import './_init.scss';

const Score = ({ value, caption, bem = {} }) => {
	const cn = 'score';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<div className={`${cnfull}`}>
			<div className={`${cn}__caption`}>{caption}</div>
			<div className={`${cn}__value`}>{value}</div>
		</div>
	);
};

export default Score;
