import { Heading } from '@Shared/typography/heading';
import Decorator from '@Shared/ui/decorator';
import { FramedBox } from '@Shared/ui/framedbox';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const ComponentBox = ({
	cn,
	placeUpperControls,
	children,
	placeTopbar,
	placeHeadbar,
	placeToolbar,
	placeFootbar,
	frame = { type: 'base', variant: 1 },
	decorator = {},
	glow,
	bem = {}
}) => {
	const cncb = 'componentbox';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<div className={`${cnfull}`}>
			{decorator ? (
				<Decorator type={decorator.type} variant={decorator.variant} />
			) : (
				''
			)}
			{glow ? <Decorator type={'glow'} variant={glow} /> : ''}
			<div className={`${cncb}`}>
				{frame ? (
					<FramedBox frame={frame.type} variant={frame.variant}>
						<div className={`${cncb}__body`}>
							{placeUpperControls && (
								<div className={`${cncb}__place ${cncb}__place--upperctrls`}>
									{placeUpperControls}
								</div>
							)}
							{placeTopbar && (
								<div className={`${cncb}__place ${cncb}__place--topbar`}>
									{placeTopbar}
								</div>
							)}
							{placeHeadbar && (
								<div className={`${cncb}__place ${cncb}__place--headbar`}>
									<Heading level={4}>{placeHeadbar}</Heading>
								</div>
							)}
							{placeToolbar && (
								<div className={`${cncb}__place ${cncb}__place--toolbar`}>
									{placeToolbar}
								</div>
							)}
							<div className={`${cncb}__place ${cncb}__place--mainbar`}>
								{children}
							</div>
							{placeFootbar && (
								<div className={`${cncb}__place ${cncb}__place--footbar`}>
									{placeFootbar}
								</div>
							)}
						</div>
					</FramedBox>
				) : (
					<div className={`${cncb}__body`}>
						{placeUpperControls && (
							<div className={`${cncb}__place ${cncb}__place--upperctrls`}>
								{placeUpperControls}
							</div>
						)}
						{placeTopbar && (
							<div className={`${cncb}__place ${cncb}__place--topbar`}>
								{placeTopbar}
							</div>
						)}
						{placeToolbar && (
							<div className={`${cncb}__place ${cncb}__place--toolbar`}>
								{placeToolbar}
							</div>
						)}
						{placeHeadbar && (
							<div className={`${cncb}__place ${cncb}__place--headbar`}>
								<Heading level={4}>{placeHeadbar}</Heading>
							</div>
						)}
						<div className={`${cncb}__place ${cncb}__place--mainbar`}>
							{children}
						</div>
						{placeFootbar && (
							<div className={`${cncb}__place ${cncb}__place--footbar`}>
								{placeFootbar}
							</div>
						)}
					</div>
				)}
			</div>
		</div>
	);
};

export { ComponentBox };
