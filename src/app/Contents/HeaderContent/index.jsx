import LogoSiteBox from '@Entities/logositebox';
import Navbar from '@Widgets/navigation/navbar';

import useBEM from '@hooks/useBEM';

import './headercontent.scss';

const HeaderContent = ({ placeA, placeNav, children, bem = {} }) => {
	const cn = 'headercontent';
	const [cnfull] = useBEM({ cn, bem });
	return (
		<div className={cnfull}>
			<div className={`${cn}__place ${cn}__place--logosite`}>
				<LogoSiteBox />
			</div>

			<div className={`${cn}__place ${cn}__place--nav`}>
				<Navbar />
			</div>
		</div>
	);
};

export default HeaderContent;
