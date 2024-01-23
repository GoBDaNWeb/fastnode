import useBEM from '@hooks/useBEM';

import './_init.scss';

const Underline = ({ variant = 1, bem = {} }) => {
	const cn = 'underline';
	const [cnfull] = useBEM({ cn, bem });

	return <div className={cnfull} data-variant={variant}></div>;
};

export default Underline;
