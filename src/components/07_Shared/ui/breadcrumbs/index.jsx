import { NavLink } from 'react-router-dom';

const Breadcrumbs = ({ links }) => {
	return (
		<div>
			{links.map(link => (
				<NavLink key={link.url} to={link.url}>
					{link.title}
				</NavLink>
			))}
		</div>
	);
};

export default Breadcrumbs;
