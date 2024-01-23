import Divider from '@Shared/ui/divider';
import { v4 as uuidv4 } from 'uuid';

import { useMemo } from 'react';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const ServiceBox = ({ children, headbar, bem = {} }) => {
	const cn = 'servicebox';
	const [cnfull] = useBEM({ cn, bem });

	const childrenArr = useMemo(
		() => (Array.isArray(children) ? children : [children]),
		[children]
	);

	return (
		<div className={`${cnfull}`}>
			<div className={`${cn}__headbar`}>{headbar}</div>
			<div className={`${cn}__mainbar`}>
				{<Divider />}
				<ul className={`${cn}__list`}>
					{childrenArr.map(item => {
						return (
							<li key={uuidv4()} className={`${cn}__slot`}>
								{<Divider />}
								{item}
							</li>
						);
					})}
				</ul>
				{<Divider />}
			</div>
		</div>
	);
};

export default ServiceBox;
