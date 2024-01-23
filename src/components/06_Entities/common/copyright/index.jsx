import useBEM from '@hooks/useBEM';

import './_init.scss';

function Copyright({ bem = {} }) {
	const cn = 'copyright';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<div className={cnfull}>
			<div className={`${cn}__body`}>
				<span>
					© Fastnode FZCO. All rights reserved. Dubai Silicon, Oasis, Dubai,
					U.A.E.
				</span>
			</div>
		</div>
	);
}

export default Copyright;
