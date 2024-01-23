import Decorator from '@Shared/ui/decorator';

import useBEM from '@hooks/useBEM';

import './boxgrd.scss';

const BoxGrd = ({
	children,
	top,
	placeA,
	placeB,
	placeC,
	placeD,
	xfull = false,
	decorator,
	decoratorPlace = 'children',
	bem = {}
}) => {
	const cn = 'boxgrd';
	const layoutClass = xfull ? ` ${cn}--xfull` : '';
	const [cnfull] = useBEM({ cn, bem });

	const _decorator = <Decorator variant={decorator} />;
	const _decoratorPlace =
		decoratorPlace === 'children' && !children ? 'root' : decoratorPlace;

	return (
		<div className={`${cnfull}${layoutClass}`}>
			{top && (
				<div className={`${cn}__headbar`}>
					<div className={`${cn}__place ${cn}__place--top`}>{top}</div>
				</div>
			)}
			<div className={`${cn}__mainbar`}>
				<div className={`${cn}__place ${cn}__place--a`}>
					{_decoratorPlace === 'a' ? _decorator : ''}
					{placeA}
				</div>
				<div className={`${cn}__place ${cn}__place--b`}>
					{_decoratorPlace === 'b' ? _decorator : ''}
					{placeB}
				</div>
				{placeC && (
					<div className={`${cn}__place ${cn}__place--c`}>{placeC}</div>
				)}
				{placeD && (
					<div className={`${cn}__place ${cn}__place--d`}>{placeD}</div>
				)}
			</div>
			{children && (
				<div className={`${cn}__place ${cn}__place--children`}>
					{children}
					{_decoratorPlace === 'children' ? _decorator : ''}
				</div>
			)}
			{_decoratorPlace === 'root' ? _decorator : ''}
		</div>
	);
};

export default BoxGrd;
