import { v4 as uuidv4 } from 'uuid';

import { useEffect, useMemo, useState } from 'react';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const FormGrid = ({
	children = [],
	placeHeadbar,
	placeUpperControls,
	placeFootbar,
	bem = {}
}) => {
	const cn = 'formgrid';
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
		<div className={cnfull}>
			<div className={`${cn}__headbar`}>
				{placeUpperControls && (
					<div className={`${cn}__upperctrls`}>{placeUpperControls}</div>
				)}
				<div className={`${cn}__head`}>{placeHeadbar}</div>
			</div>
			<div className={`${cn}__mainbar`}>
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
			<div className={`${cn}__footbar`}>{placeFootbar}</div>
		</div>
	);
};

export { FormGrid };
