import { v4 as uuidv4 } from 'uuid';

import { useEffect, useMemo, useState } from 'react';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const Toolset = ({ children, size, dir, justify, fill, bem = {} }) => {
	const cn = 'toolset';
	const [cnfull] = useBEM({ cn, bem });
	const childArr = useMemo(
		() => (Array.isArray(children) ? children : [children]),
		[children]
	);
	const [childLength, setChildLength] = useState(0);
	useEffect(() => {
		setChildLength(childArr.length);
	}, [childArr]);

	return (
		<div
			className={`${cnfull}`}
			data-size={size}
			data-dir={dir}
			data-fill={fill}
			data-justify={justify}
		>
			{childArr.map((item, index) => {
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

export default Toolset;
