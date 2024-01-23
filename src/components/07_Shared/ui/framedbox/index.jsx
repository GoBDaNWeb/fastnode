import useBEM from '@hooks/useBEM';

import './_init.scss';

const FramedBox = ({
	cn,
	children,
	frame = 'base',
	variant = 1,
	circle,
	bem = {}
}) => {
	/**
	 * frame: base | attract | navbar
	 */
	const cnfb = 'framedbox';
	// const [cnfull] = useBEM({ cn, bem });

	const [cnfbfull] = useBEM({ cn: cnfb, bem });

	return (
		<div
			className={`${cn ? cn + ' ' : ''}${cnfbfull}`}
			data-frame={frame}
			data-variant={variant}
			data-circle={circle}
		>
			{children}
		</div>
	);
};

export { FramedBox };
