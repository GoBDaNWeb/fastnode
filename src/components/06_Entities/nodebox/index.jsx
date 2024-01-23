import { Heading } from '@Shared/typography/heading';
import { List } from '@Shared/typography/list';
import { BoxA } from '@Shared/ui/boxa';
import BoxGrd from '@Shared/ui/layouts/boxgrd';
import { CtrlsGrd } from '@Shared/ui/layouts/ctrlsgrd';

import { useMemo } from 'react';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const NodeBox = ({
	heading,
	features,
	controls,
	decorator,
	glow = 'nodebox',
	ornament = 'nodebox',
	bem = {}
}) => {
	const cn = 'nodebox';
	const [cnfull] = useBEM({ cn, bem });

	const _heading = heading;
	const _controls = controls;

	const _features = useMemo(
		() => (Array.isArray(features) ? features : [features]),
		[features]
	);

	return (
		<BoxA cls={cnfull} glow={glow} decorator={decorator} ornament={ornament}>
			<BoxGrd
				placeA={<Heading level={4}>{_heading}</Heading>}
				placeB={
					<List bullet={'checkmark'} bem={{ prefix: cn }}>
						{_features}
					</List>
				}
				placeC={<CtrlsGrd>{_controls}</CtrlsGrd>}
			/>
		</BoxA>
	);
};

export default NodeBox;

/*

<ul className={`${cn}__features list list--features`}>
							{_features.map((item, index) => {
								return <div key={uuidv4()}>{item}</div>;
							})}
						</ul>


*/
