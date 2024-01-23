import useBEM from '@hooks/useBEM';

import './_init.scss';

function Icon({ icon, svg, bem = {} }) {
	const cn = icon ? 'iconf' : 'iconsvg';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<>
			{svg && <span className={cnfull} data-iconsvg={svg}></span>}
			{icon && <span className={cnfull} data-iconf={icon}></span>}
		</>
	);
}

export default Icon;
