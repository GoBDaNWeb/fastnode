import useBEM from '@hooks/useBEM';

import './_init.scss';

function Preloader({ position, fullScreen, size = '3', bem = {} }) {
	const cn = 'preloader';
	const [cnfull] = useBEM({ cn, bem });

	if (fullScreen) {
		return (
			<div className={`${cn}-wrapper`} data-position={position}>
				<div className={`${cnfull}`} data-size={size}>
					<div className={`${cn}__helper`}></div>
				</div>
			</div>
		);
	} else {
		return (
			<div className={`${cnfull}`} data-size={size} data-position={position}>
				<div className={`${cn}__helper`}></div>
			</div>
		);
	}
}

export default Preloader;
