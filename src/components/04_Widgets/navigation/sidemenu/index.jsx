import { v4 as uuidv4 } from 'uuid';

import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';

import { useAuthLogout } from '@hooks/useAuthLogout';
import useBEM from '@hooks/useBEM';

import './_init.scss';

const sidemenu = {
	title: 'sidemenu',
	items: [
		{
			id: 1,
			icon: 'personal',
			name: 'personal',
			to: 'personal'
		},
		{
			id: 2,
			icon: 'dashboard',
			name: 'dashboard',
			to: 'dashboard'
		},
		{
			id: 3,
			icon: 'configurator',
			name: 'configurator',
			to: 'configurator'
		},
		{
			id: 4,
			icon: 'invoices',
			name: 'invoices',
			to: 'invoices'
		},
		{
			id: 5,
			icon: 'signout',
			name: 'signout',
			to: 'signout'
		}
	]
};

const Sidemenu = ({ bem = {} }) => {
	const { t } = useTranslation();

	const loc = useLocation();
	const current = loc.pathname.split('/').filter(el => el !== '')[0];

	const cn = 'sidemenu';
	const [cnfull] = useBEM({ cn, bem });

	const menuData = sidemenu.items;

	const _baseUrl = '/';
	const { signout } = useAuthLogout();

	const menuRef = useRef(null);

	useEffect(() => {
		// const menu = menuRef.current;
		// menu.querySelectorAll('li').forEach(item => {
		// 	const isActive = item.classList.contains('active');
		// 	if (isActive) item.querySelector('a').focus();
		// });
	}, []);

	return (
		<ul className={`${cnfull}`} ref={menuRef}>
			{menuData.map(item => {
				return (
					<li
						key={uuidv4()}
						className={`${cn}__item${current === item.to ? ` active` : ''}`}
						// tabIndex={0}
					>
						<NavLink
							to={item.to !== 'signout' ? `${_baseUrl}${item.to}` : ''}
							onClick={item.to === 'signout' ? signout : ''}
							className={`${cn}__link`}
							data-icon={item.icon}
						>
							<span>{t(`sidemenu.items.${item.name}`)}</span>
						</NavLink>
					</li>
				);
			})}
		</ul>
	);
};

export default Sidemenu;
