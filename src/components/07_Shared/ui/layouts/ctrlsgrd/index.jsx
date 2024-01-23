import { v4 as uuidv4 } from 'uuid';

import { useEffect, useMemo, useState } from 'react';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const CtrlsGrd = ({
	children = [],
	size = 'auto',
	dir = 'row',
	// layout,
	fill = 'auto',
	wrap = 'auto',
	justify = 'auto',
	template = 'auto',
	axis = 'x',
	minWidth,
	bem = {}
}) => {
	const cn = 'ctrlsgrd';
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
			data-dir={dir}
			data-fill={fill}
			data-wrap={wrap}
			data-justify={justify}
			data-template={template}
			// data-layout={layout}
			// style={minWidth ? { '--ctrlsgrd-w': `${minWidth}` } : {}}
		>
			{childrenArr.map((item, index) => {
				if (!item) return;
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

export { CtrlsGrd };
