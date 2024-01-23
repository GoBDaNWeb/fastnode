import { Heading } from '@Shared/typography/heading';
import { v4 as uuidv4 } from 'uuid';

import { useEffect, useMemo, useState } from 'react';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const BoardsetGrd = ({
	children = [],
	size = 0,
	dir = 'row',
	heading,
	bem = {}
}) => {
	const cn = 'boardsetgrd';
	const [cnfull] = useBEM({ cn, bem });
	const childrenArr = useMemo(
		() => (Array.isArray(children) ? children : [children]),
		[children]
	);

	// const [childLength, setChildLength] = useState(0);
	// useEffect(() => {
	// 	setChildLength(childrenArr.length);
	// }, [childrenArr]);

	return (
		<div className={`${cnfull}`} data-size={size} data-dir={dir}>
			{heading && <div className={`${cn}__heading`}>{heading}</div>}
			<div className={`${cn}__body`}>
				{childrenArr.map((item, index) => {
					return (
						<div
							key={uuidv4()}
							className={`${cn}__slot`}
							// style={{ '--computed-z-index': childLength - index }}
						>
							{item}
						</div>
					);
				})}
			</div>
		</div>
	);
};

export default BoardsetGrd;
