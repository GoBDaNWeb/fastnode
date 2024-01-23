import useBEM from '@hooks/useBEM';

import './_init.scss';

const Template = ({ children, bem = {} }) => {
	const cn = 'template';
	const [cnfull] = useBEM({ cn, bem });
	return <div className={cnfull}>{children}</div>;
};
const Header = ({ children, bem = {} }) => {
	const cn = 'header';
	const [cnfull] = useBEM({ cn, bem });
	return (
		<header className={cnfull}>
			<div className={`${cn}__layout`}>{children}</div>
		</header>
	);
};
const Main = ({ children, bem = {} }) => {
	const cn = 'main';
	const [cnfull] = useBEM({ cn, bem });
	return (
		<main className={cnfull}>
			<div className={`${cn}__layout`}>{children}</div>
		</main>
	);
};
const Footer = ({ children, bem = {} }) => {
	const cn = 'footer';
	const [cnfull] = useBEM({ cn, bem });
	return (
		<footer className={cnfull}>
			<div className={`${cn}__layout`}>{children}</div>
		</footer>
	);
};
export { Template, Header, Main, Footer };
