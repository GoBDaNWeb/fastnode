import { NavLink } from 'react-router-dom';

import { Heading } from '@Shared/typography/heading';
import Badge from '@Shared/ui/badge';
import { BoxA } from '@Shared/ui/boxa';
import BoxGrd from '@Shared/ui/layouts/boxgrd';

import useBEM from '@hooks/useBEM';

import './nodeslistitem.scss';

const NodesListItem = ({ node, img, link, bem = {} }) => {
	const cn = 'nodeslistitem';
	const [cnfull] = useBEM({ cn, bem });
	return (
		<NavLink className={cnfull} to={node.coin}>
			<BoxA>
				<BoxGrd
					placeA={
						<>
							<div className='image-wrapper'>
								<img src={img} alt={node.coin} />
							</div>
							<Heading level={3}>{node.name}</Heading>
						</>
					}
					placeB={
						<>
							<div className='badge-row'>
								<p>Node type:</p>
								<Badge type='transparent' color='sky' title='full' />
								{node.has_archive_mode ? (
									<Badge type='transparent' color='sky' title='archiwe' />
								) : null}
							</div>
							<div className='badge-row'>
								<p>Avaliable networks:</p>
								{node.networks.map(badge => (
									<Badge key={badge} type='transparent' color='green' title={badge} />
								))}
							</div>
							<div className='badge-row'>
								<p>Avaliable interfaces:</p>

								{node.interfaces.map(badge => (
									<Badge key={badge} type='transparent' color='blue' title={badge} />
								))}
							</div>
						</>
					}
				/>
			</BoxA>
		</NavLink>
	);
};

export default NodesListItem;
