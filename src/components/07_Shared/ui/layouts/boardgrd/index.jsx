import { Heading } from '@Shared/typography/heading';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const BoardGrd = ({ children, heading, toolbar, type, bem = {} }) => {
	const cn = 'boardgrd';
	const typeClass = type ? ` ${cn}--${type}` : '';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<div className={`${cnfull}${typeClass}`}>
			<div className={`${cn}__body`}>{children}</div>
		</div>
	);
};

export default BoardGrd;
