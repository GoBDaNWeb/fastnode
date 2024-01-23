import useBEM from '@hooks/useBEM';

import './dashgrd.scss';

const DashGrd = ({
	children,
	topbar,
	headbar,
	footbar,
	mainStart,
	mainEnd,
	xfull = false,
	bem = {}
}) => {
	const cn = 'dashgrd';
	const layoutClass = xfull ? ` ${cn}--xfull` : '';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<div className={`${cnfull}${layoutClass}`}>
			{topbar && <div className={`${cn}__topbar`}>{topbar}</div>}
			{headbar && <div className={`${cn}__headbar`}>{headbar}</div>}
			<div className={`${cn}__mainbar`}>
				{mainStart && (
					<div className={`${cn}__place ${cn}__place--main-start`}>
						{mainStart}
					</div>
				)}
				{children && (
					<div className={`${cn}__place ${cn}__place--main-children`}>
						{children}
					</div>
				)}
				{mainEnd && (
					<div className={`${cn}__place ${cn}__place--main-end`}>{mainEnd}</div>
				)}
			</div>

			{footbar && <div className={`${cn}__footbar`}>{footbar}</div>}
		</div>
	);
};

export default DashGrd;
