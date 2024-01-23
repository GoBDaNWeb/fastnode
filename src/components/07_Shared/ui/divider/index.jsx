import useBEM from '@hooks/useBEM';

import './_init.scss';

const Divider = ({ variant = 1, bem = {} }) => {
	const cn = 'divider';
	const [cnfull] = useBEM({ cn, bem });

	return <div className={cnfull} data-variant={variant}></div>;
};

export default Divider;
