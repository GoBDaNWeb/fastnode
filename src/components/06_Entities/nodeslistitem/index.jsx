import { NavLink } from 'react-router-dom';

import { Heading } from '@Shared/typography/heading';
import Badge from '@Shared/ui/badge';
import { BoxA } from '@Shared/ui/boxa';
import BoxGrd from '@Shared/ui/layouts/boxgrd';

import useBEM from '@hooks/useBEM';

import './nodeslistitem.scss';

const NodesListItem = ({ heading, img, link, badges, bem = {} }) => {
	const cn = 'nodeslistitem';
	const [cnfull] = useBEM({ cn, bem });
	return (
		<NavLink className={cnfull} to={link}>
			<BoxA>
				<BoxGrd
					placeA={
						<>
							<div className='image-wrapper'>
								<img src={img} alt='node' />
							</div>
							<Heading level={3}>{heading}</Heading>
						</>
					}
					placeB={
						<>
							<div className='badge-row'>
								<p>Node tupe:</p>
								{badges ? (
									<>
										{badges.node.map(badge => (
											<Badge
												key={badge.title}
												type={badge.type}
												color={badge.color}
												title={badge.title}
											/>
										))}
									</>
								) : null}
							</div>
							<div className='badge-row'>
								<p>Avaliable networks:</p>
								{badges ? (
									<>
										{badges.avaliableNet.map(badge => (
											<Badge
												key={badge.title}
												type={badge.type}
												color={badge.color}
												title={badge.title}
											/>
										))}
									</>
								) : null}
							</div>
							<div className='badge-row'>
								<p>Avaliable interfaces:</p>
								{badges ? (
									<>
										{badges.avaliableInt.map(badge => (
											<Badge
												key={badge.title}
												type={badge.type}
												color={badge.color}
												title={badge.title}
											/>
										))}
									</>
								) : null}
							</div>
						</>
					}
				/>
			</BoxA>
		</NavLink>
	);
};

export default NodesListItem;
