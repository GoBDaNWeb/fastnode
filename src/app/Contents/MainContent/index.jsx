import useBEM from '@hooks/useBEM';

import './maincontent.scss';

const MainContent = ({ placeA, placeB, children, bem = {} }) => {
	const cn = 'maincontent';
	const [cnfull] = useBEM({ cn, bem });
	return <div className={cnfull}>{children}</div>;
};

export default MainContent;
