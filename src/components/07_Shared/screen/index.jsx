import Decorator from '@Shared/ui/decorator';
import { FramedBox } from '@Shared/ui/framedbox';

import useBEM from '@hooks/useBEM';

import './screen.scss';

const Screen = ({
	id,
	cls,
	children,
	frame,
	frameVariant = 1,
	decorator = {},
	glow,
	overlay,
	xfull,
	bem = {}
}) => {
	const cn = 'screen';
	const [cnfull] = useBEM({ cn, bem });
	const layoutClass = xfull ? ` ${cn}--xfull` : '';
	const _cls = cls ? ` ${cls}` : '';

	return (
		<div id={id} className={`${cnfull}${layoutClass}${_cls}`}>
			<div className={`${cn}__layout`}>
				{frame ? (
					<FramedBox frame={frame} variant={frameVariant}>
						<div className={`${cn}__body`}>{children}</div>
					</FramedBox>
				) : (
					<div className={`${cn}__body`}>{children}</div>
				)}
				{decorator ? (
					<Decorator type={decorator.type} variant={decorator.variant} />
				) : (
					''
				)}
				{glow ? <Decorator type={'glow'} variant={glow} /> : ''}
				{overlay ? <Decorator type={'overlay'} variant={overlay} /> : ''}
			</div>
		</div>
	);
};

export default Screen;
