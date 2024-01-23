import useBEM from '@hooks/useBEM';

import './_init.scss';

const Heading = ({
	children,
	level,
	align,
	badge,
	size,
	variant,
	icon,
	bem = {}
}) => {
	const cn = 'heading';
	const [cnfull] = useBEM({ cn, bem });

	const lvl = Number(level);
	const body =
		lvl === 1 ? (
			<h1>{children}</h1>
		) : lvl === 2 ? (
			<h2>{children}</h2>
		) : lvl === 3 ? (
			<h3>{children}</h3>
		) : lvl === 4 ? (
			<h4>{children}</h4>
		) : lvl === 5 ? (
			<h5>{children}</h5>
		) : lvl === 6 ? (
			<h6>{children}</h6>
		) : (
			<span>{children}</span>
		);

	return (
		<div
			className={`${cnfull} ${cnfull}--level${lvl}`}
			data-size={size}
			data-variant={variant}
			data-align={align}
		>
			{badge ? (
				<div className={`${cn}__place ${cn}__place--badge`}>
					<div className={`${cn}__badge`}>{badge}</div>
				</div>
			) : (
				''
			)}
			<div className={`${cn}__place ${cn}__place--body`}>
				<div className={`${cn}__body`}>
					{body}&nbsp;{icon && <div className={`${cn}__icon`}>{icon}</div>}
				</div>
			</div>
		</div>
	);
};

export { Heading };
