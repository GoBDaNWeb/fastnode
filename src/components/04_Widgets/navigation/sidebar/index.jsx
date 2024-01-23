import { FramedBox } from '@Shared/ui/framedbox';
import Sidemenu from '@Widgets/navigation/sidemenu';
import { useClickAway } from '@uidotdev/usehooks';

import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const Sidebar = ({ bem = {} }) => {
	const loc = useLocation();
	const current = loc.pathname.split('/').filter(el => el !== '')[0];

	const cn = 'sidebar';
	const [cnfull] = useBEM({ cn, bem });
	const [opened, setOpened] = useState(false);

	const ref = useClickAway(() => {
		setOpened(false);
	});
	function handleClick() {
		setOpened(!opened);
	}

	return (
		<nav ref={ref} className={`${cnfull}${opened ? ' opened' : ''}`}>
			<div className={`${cn}__headbar`}>
				<button
					onClick={handleClick}
					className={`${cn}__headcaption`}
					data-icon={current}
				>
					<span>{current}</span>
				</button>
			</div>
			<div className={`${cn}__mainbar`}>
				<FramedBox />
				<nav className={`${cn}__body`}>
					<div className={`${cn}__place ${cn}__place--mainbar`}>
						<Sidemenu />
					</div>
				</nav>
			</div>
		</nav>
	);
};

export default Sidebar;
