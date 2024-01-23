import Decorator from '@Shared/ui/decorator';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const ChartGrd = ({
	children,
	topbar,
	headbar,
	toolbar,
	footbar,
	start,
	end,
	xfull = false,
	// decorator,
	// decoratorPlace = 'children',
	bem = {}
}) => {
	const cn = 'chartgrd';
	const layoutClass = xfull ? ` ${cn}--xfull` : '';
	const [cnfull] = useBEM({ cn, bem });

	// const _decorator = <Decorator variant={decorator} />;
	// const _decoratorPlace =
	// 	decoratorPlace === 'children' && !children ? 'root' : decoratorPlace;

	return (
		<div className={`${cnfull}${layoutClass}`}>
			{topbar && <div className={`${cn}__topbar`}>{topbar}</div>}
			{headbar && <div className={`${cn}__headbar`}>{headbar}</div>}
			{toolbar && <div className={`${cn}__toolbar`}>{toolbar}</div>}
			<div className={`${cn}__mainbar`}>
				{start && <div className={`${cn}__main-start`}>{start}</div>}
				{children && <div className={`${cn}__main-body`}>{children}</div>}
				{end && <div className={`${cn}__main-end`}>{end}</div>}
			</div>

			{footbar && <div className={`${cn}__footbar`}>{footbar}</div>}
		</div>
	);
};

export default ChartGrd;
