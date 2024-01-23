import useBEM from '@hooks/useBEM';

import './description.scss';

const Description = ({ children, variant, align, bem = {}, ...rest }) => {
	const cn = 'description';
	const [cnfull] = useBEM({ cn, bem });

	const alignSuffix = align ? ` ${cn}--${align}` : ``;

	return (
		<div className={`${cnfull}${alignSuffix}`} data-variant={variant}>
			{children}
		</div>
	);
};

export { Description };
