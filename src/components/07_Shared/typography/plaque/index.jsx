import useBEM from '@hooks/useBEM';

import './_init.scss';

const Plaque = ({
	children,
	color,
	uppercase,
	size,
	variant,
	accessor,
	bem = {}
}) => {
	const cn = 'plaque';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<div
			className={`${cnfull}`}
			data-size={size}
			data-color={color}
			data-uppercase={uppercase}
			data-variant={variant}
			data-accessor={accessor}
		>
			<span>{children}</span>
		</div>
	);
};

export default Plaque;
