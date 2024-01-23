import { v4 as uuidv4 } from 'uuid';

import { useEffect, useMemo, useState } from 'react';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const UsermenuGrd = ({
	children = [],
	isAuth,
	size = 'auto',
	template,
	bem = {}
}) => {
	const cn = 'usermenugrd';
	const [cnfull] = useBEM({ cn, bem });
	const childrenArr = useMemo(
		() => (Array.isArray(children) ? children : [children]),
		[children]
	);

	const [childLength, setChildLength] = useState(0);
	useEffect(() => {
		setChildLength(childrenArr.length);
	}, [childrenArr]);

	return (
		<div
			className={`${cnfull}`}
			data-size={size}
			data-template={template}
			data-is-auth={isAuth}
			// style={minWidth ? { '--ctrlsgrd-w': `${minWidth}` } : {}}
		>
			{childrenArr.map((item, index) => {
				return (
					<div
						key={uuidv4()}
						className={`${cn}__slot`}
						style={{ '--computed-z-index': childLength - index }}
					>
						{item}
					</div>
				);
			})}
		</div>
	);
};

export { UsermenuGrd };
