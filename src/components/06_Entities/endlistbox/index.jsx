import Divider from '@Shared/ui/divider';
import { v4 as uuidv4 } from 'uuid';

import { useMemo } from 'react';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const EndlistBox = ({ children, bem = {} }) => {
	const cn = 'endlistbox';
	const [cnfull] = useBEM({ cn, bem });

	const childrenArr = useMemo(
		() => (Array.isArray(children) ? children : [children]),
		[children]
	);

	return (
		<div className={`${cnfull}`}>
			<ul className={`${cn}__list`}>
				{childrenArr.map((item, index) => {
					return (
						<li key={uuidv4()} className={`${cn}__slot`}>
							{item}
							{<Divider />}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default EndlistBox;
