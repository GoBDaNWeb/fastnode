import Plaque from '@Shared/typography/plaque';
import { v4 as uuidv4 } from 'uuid';

import { useMemo } from 'react';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const EndlistItem = ({ start, children, bem = {} }) => {
	const cn = 'endlistitem';
	const [cnfull] = useBEM({ cn, bem });
	const colorCollation = {
		wss: 'bluebird',
		https: 'dodgerblue'
	};
	const childrenArr = useMemo(
		() => (Array.isArray(start) ? start : [start]),
		[start]
	);
	return (
		<div className={`${cnfull}`}>
			<div className={`${cn}__start`}>
				{childrenArr.map(item => {
					return (
						<div key={uuidv4()} className={`${cn}__slot`}>
							<Plaque uppercase={true} color={colorCollation[item]}>
								{item}
							</Plaque>
						</div>
					);
				})}
			</div>
			<div className={`${cn}__body`}>{children}</div>
		</div>
	);
};

export default EndlistItem;
