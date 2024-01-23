import Decorator from '@Shared/ui/decorator';

import useBEM from '@hooks/useBEM';

import './screengrd.scss';

const ScreenGrd = ({
	children,
	top,
	placeA,
	placeB,
	placeC,
	placeD,
	xfull = false,
	glow,
	glowPlace = 'children',
	bem = {}
}) => {
	const cn = 'screengrd';
	const layoutClass = xfull ? ` ${cn}--xfull` : '';
	const [cnfull] = useBEM({ cn, bem });

	const _glow = glow ? <Decorator type={'glow'} variant={glow} /> : '';
	const _glowPlace = glowPlace === 'children' && !children ? 'root' : glowPlace;

	return (
		<div className={`${cnfull}${layoutClass}`}>
			{top && (
				<div className={`${cn}__headbar`}>
					<div className={`${cn}__place ${cn}__place--top`}>{top}</div>
				</div>
			)}
			<div className={`${cn}__mainbar`}>
				<div className={`${cn}__place ${cn}__place--a`}>
					{_glowPlace === 'a' ? _glow : ''}
					{placeA}
				</div>
				<div className={`${cn}__place ${cn}__place--b`}>
					{_glowPlace === 'b' ? _glow : ''}
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
					{_glowPlace === 'children' ? _glow : ''}
				</div>
			)}
			{_glowPlace === 'root' ? _glow : ''}
		</div>
	);
};

export default ScreenGrd;
