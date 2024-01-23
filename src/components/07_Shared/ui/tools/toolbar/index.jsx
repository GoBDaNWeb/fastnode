import { v4 as uuidv4 } from 'uuid';

import { useEffect, useMemo, useState } from 'react';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const Toolbar = ({ children, start, end, dir, bem = {} }) => {
	const cn = 'toolbar';
	const [cnfull] = useBEM({ cn, bem });
	const childArr = useMemo(
		() => (Array.isArray(children) ? children : [children]),
		[children]
	);
	const startArr = useMemo(
		() => (Array.isArray(start) ? start : [start]),
		[start]
	);

	const endArr = useMemo(() => (Array.isArray(end) ? end : [end]), [end]);

	const [startLength, setStartLength] = useState(0);
	const [childLength, setChildLength] = useState(0);
	const [endLength, setEndLength] = useState(0);
	useEffect(() => {
		setStartLength(startArr.length);
		setChildLength(childArr.length);
		setEndLength(endArr.length);
	}, [startArr, childArr, endArr]);

	return (
		<div className={`${cnfull}`} data-dir={dir}>
			{start && (
				<div className={`${cn}__start`}>
					{startArr.map((item, index) => {
						return (
							<div
								key={uuidv4()}
								className={`${cn}__slot`}
								style={{ '--computed-z-index': startLength - index }}
							>
								{item}
							</div>
						);
					})}
				</div>
			)}
			{children && (
				<div className={`${cn}__body`}>
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
			)}
			{end && (
				<div className={`${cn}__end`}>
					{endArr.map((item, index) => {
						return (
							<div
								key={uuidv4()}
								className={`${cn}__slot`}
								style={{ '--computed-z-index': endLength - index }}
							>
								{item}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
};

export default Toolbar;
