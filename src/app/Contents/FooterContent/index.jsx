import useBEM from '@hooks/useBEM';

import './footercontent.scss';

const FooterContent = ({ placeA, placeB, children, bem = {} }) => {
	const cn = 'footercontent';
	const [cnfull] = useBEM({ cn, bem });
	return (
		<div className={cnfull}>
			<div className={`${cn}__place ${cn}__place--a`}>{placeA}</div>
			<div className={`${cn}__place ${cn}__place--b`}>{placeB}</div>
		</div>
	);
};

export default FooterContent;
