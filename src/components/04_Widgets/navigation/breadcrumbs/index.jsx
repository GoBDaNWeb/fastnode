import { v4 as uuidv4 } from 'uuid';

import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const Breadcrumbs = ({ bem = {} }) => {
	const { t } = useTranslation();
	const loc = useLocation();
	const bread = loc.pathname.split('/');
	const cn = 'breadcrumbs';
	const [cnfull] = useBEM({ cn, bem });
	return (
		<div className={`${cnfull}`}>
			<ul>
				{bread.map((crumb, index) => {
					if (index < bread.length - 1) {
						return (
							<li key={uuidv4()} className={`${cn}__item`}>
								<Link to={`/${crumb}` || '/'} className={`${cn}__link`}>
									{t(`breadcrumbs.items.${crumb || 'home'}`)}
								</Link>
							</li>
						);
					} else {
						return (
							<li key={uuidv4()} className={`${cn}__item current`}>
								<b>{t(`breadcrumbs.items.${crumb}`)}</b>
							</li>
						);
					}
				})}
			</ul>
		</div>
	);
};

export default Breadcrumbs;
