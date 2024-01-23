import { Link } from 'react-router-dom';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const Identify = ({
	to,
	target,
	children,
	color,
	uppercase,
	size,
	variant,
	accessor,
	prefix,
	bem = {}
}) => {
	const cn = 'identify';
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
			{to ? (
				<Link target={target} to={to}>
					{prefix ? `${prefix}${children}` : children}
				</Link>
			) : (
				<span>{prefix ? `${prefix}${children}` : children}</span>
			)}
		</div>
	);
};

export default Identify;
