import { v4 as uuidv4 } from 'uuid';

import { useEffect, useMemo, useState } from 'react';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const List = ({ cls, children, bullet, variant, align, bem = {} }) => {
	const cn = 'list';
	const [cnfull] = useBEM({ cn, bem });

	const _children = useMemo(
		() => (Array.isArray(children) ? children : [children]),
		[children]
	);

	const [childrenLength, setChildrenLength] = useState(0);
	useEffect(() => {
		setChildrenLength(_children.length);
	}, [_children]);

	const alignSuffix = align ? ` ${cn}--${align}` : ``;
	const bulletSuffix = bullet ? ` ${cn}--${bullet}` : ``;

	return (
		<ul
			className={`${cnfull}${bulletSuffix}${alignSuffix}`}
			data-variant={variant}
		>
			{_children.map((item, index) => {
				return (
					<li key={uuidv4()}>
						<span>{item}</span>
					</li>
				);
			})}
		</ul>
	);
};

export { List };
