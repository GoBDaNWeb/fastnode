import { v4 as uuidv4 } from 'uuid';

import { useMemo } from 'react';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const PlaqueBox = ({ children, start, end, extra, bem = {} }) => {
	const cn = 'plaquebox';
	const [cnfull] = useBEM({ cn, bem });
	const childrenArr = useMemo(() => {
		if (children?.props?.children) {
			return Array.isArray(children?.props?.children)
				? children?.props?.children
				: [children?.props?.children];
		} else {
			return Array.isArray(children) ? children : [children];
		}
	}, [children]);

	const startArr = useMemo(
		() => (Array.isArray(start) ? start : [start]),
		[start]
	);
	const endArr = useMemo(() => (Array.isArray(end) ? end : [end]), [end]);
	const extraArr = useMemo(
		() => (Array.isArray(extra) ? extra : [extra]),
		[extra]
	);

	return (
		<div className={`${cnfull}`}>
			<div className={`${cn}__body`}>
				{start &&
					startArr.map(item => {
						return (
							<div key={uuidv4()} className={`${cn}__slot ${cn}__slot--start`}>
								{item}
							</div>
						);
					})}
				{children &&
					childrenArr.map(item => {
						return (
							<div key={uuidv4()} className={`${cn}__slot ${cn}__slot--body`}>
								{item}
							</div>
						);
					})}
				{end && (
					<>
						{endArr.map(item => {
							return (
								<div key={uuidv4()} className={`${cn}__slot ${cn}__slot--end`}>
									{item}
								</div>
							);
						})}
					</>
				)}
				{extra && (
					<>
						{extraArr.map(item => {
							return (
								<div
									key={uuidv4()}
									className={`${cn}__slot ${cn}__slot--extra`}
								>
									{item}
								</div>
							);
						})}
					</>
				)}
			</div>
		</div>
	);
};

export default PlaqueBox;
