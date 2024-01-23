import useBEM from '@hooks/useBEM';

import './_init.scss';

const FldGrd = ({
	children,
	label,
	notify,
	assist,
	tag,
	type,
	gridtmpl = 'base',
	minWidth,
	bem = {}
}) => {
	const cn = 'fldgrd';
	const [cnfull] = useBEM({ cn, bem });

	const gridTagSfx = tag ? ` ${cn}--${tag}` : '';
	const gridTypeSfx = type ? ` ${cn}--${type}` : '';
	const gridTmplSfx = gridtmpl ? ` ${cn}--${gridtmpl}` : '';
	// const childrenArr = Array.isArray(children) ? children : [children];
	return (
		<div
			className={`${cnfull}${gridTagSfx}${gridTypeSfx}${gridTmplSfx}`}
			data-grid-tag={tag}
			data-grid-type={type}
			data-grid-tmpl={gridtmpl}
		>
			{label ? <div className={`${cn}__place ${cn}__place--labelbar`}>{label}</div> : ''}
			<div className={`${cn}__place ${cn}__place--mainbar`}>{children}</div>
			<div className={`${cn}__place ${cn}__place--footbar`}>
				<div className={`${cn}__slot ${cn}__slot--notify`}>{notify}</div>
				{assist ? <div className={`${cn}__slot ${cn}__slot--assist`}>{assist}</div> : ''}
			</div>
		</div>
	);
};

export { FldGrd };
