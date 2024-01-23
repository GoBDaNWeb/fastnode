// import Image from '@Shared/ui/image';
import Svg from '@Shared/ui/svg';

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const LogoSiteBox = ({ src, bem = {} }) => {
	const { t } = useTranslation();

	const cn = 'logositebox';
	const [cnfull] = useBEM({ cn, bem });

	// const imagePath = src ?? `images/sprite.svg`;
	const svgPath = src ?? `images/sprite.svg`;

	return (
		<div className={`${cnfull}`}>
			<div className={`${cn}__body`}>
				<Link to='/' tabIndex={0} aria-label={t('header.aria-label.logosite')}>
					{/* <Image src={imagePath} symbolId={'logo'} alt='logo' width={52} height={34} /> */}
					<Svg
						src={svgPath}
						symbolId={'logosite'}
						// title={t('header.aria-label.logosite')}
					/>
				</Link>
			</div>
		</div>
	);
};

export default LogoSiteBox;
