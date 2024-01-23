import SocialsList from '@Entities/common/socialsList';

import useBEM from '@hooks/useBEM';

import './_init.scss';

function Socials({ bem = {} }) {
	const cn = 'socials';
	const [cnfull, prefix] = useBEM({ cn, bem });

	return (
		<div className={cnfull}>
			<SocialsList bem={{ prefix: prefix }} />
		</div>
	);
}

export default Socials;
