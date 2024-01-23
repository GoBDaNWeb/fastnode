import './badge.scss';

const Badge = ({ title, color, type }) => {
	const badge = `badge ${color ? color : ''} ${type ? type : ''}`;

	return <div className={badge}>{title}</div>;
};

export default Badge;
