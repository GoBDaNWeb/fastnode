import Decorator from '@Shared/ui/decorator';
import { FramedBox } from '@Shared/ui/framedbox';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const BoxA = ({
	cls,
	placeUpperControls,
	children,
	frame = 'base',
	frameVariant = 1,
	glow,
	decorator,
	ornament,
	bem = {}
}) => {
	const cn = 'boxa';
	const [cnfull] = useBEM({ cn, bem });
	const _cls = cls ? ` ${cls}` : '';

	return (
		<div className={`${cnfull}${_cls}`}>
			{glow && <Decorator type={'glow'} variant={glow} />}
			{frame ? (
				<FramedBox frame={frame} variant={frameVariant}>
					<div className={`${cn}__body`}>
						{placeUpperControls && (
							<div className={`${cn}__place ${cn}__place--upperctrls`}>
								{placeUpperControls}
							</div>
						)}
						<div className={`${cn}__place ${cn}__place--mainbar`}>
							{children}
						</div>
					</div>
					{ornament && <Decorator type={'ornament'} variant={ornament} />}
				</FramedBox>
			) : (
				<>
					<div className={`${cn}__body`}>
						{placeUpperControls && (
							<div className={`${cn}__place ${cn}__place--upperctrls`}>
								{placeUpperControls}
							</div>
						)}
						<div className={`${cn}__place ${cn}__place--mainbar`}>
							{children}
						</div>
					</div>
					{ornament && <Decorator type={'ornament'} variant={ornament} />}
				</>
			)}

			{decorator && (
				<Decorator type={decorator.type} variant={decorator.variant} />
			)}
		</div>
	);
};

export { BoxA };
