import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { Heading } from '@Shared/typography/heading';
import Badge from '@Shared/ui/badge';
import { BoxA } from '@Shared/ui/boxa';
import BoxGrd from '@Shared/ui/layouts/boxgrd';

import useBEM from '@hooks/useBEM';

import './fullnodebox.scss';

const badges = {
	access: [
		{
			type: 'fill',
			title: 'DEDICATED CLUSTER',
			color: 'blue'
		},
		{
			type: 'fill',
			title: 'CUSTOM NODES',
			color: 'sky'
		}
	],
	networks: [
		{
			type: 'transparent',
			title: 'GOERLI',
			color: 'green'
		},
		{
			type: 'transparent',
			title: 'MAINET',
			color: 'green'
		},
		{
			type: 'transparent',
			title: 'SEPOLIA',
			color: 'green'
		},
		{
			type: 'transparent',
			title: 'HOLESKY',
			color: 'green'
		},
		{
			type: 'transparent',
			title: 'TESTNET',
			color: 'green'
		}
	],
	api: [
		{
			type: 'transparent',
			title: 'GRAPHQL',
			color: 'blue'
		},
		{
			type: 'transparent',
			title: 'JSON-RPC',
			color: 'blue'
		},
		{
			type: 'transparent',
			title: 'WS',
			color: 'blue'
		}
	]
};

const FullNodeBox = ({ currentNode, bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'fullnodebox';
	const [cnfull] = useBEM({ cn, bem });
	const currentScheme = useSelector(state => state.scheme.currentScheme);

	return (
		<BoxA cls={cnfull}>
			<BoxGrd
				top={
					<>
						{currentNode ? (
							<div className='image-wrapper'>
								<img
									src={
										currentScheme === 'light' && currentNode.imgDark
											? `/${currentNode.imgDark}`
											: `/${currentNode.img}`
									}
									alt='node'
								/>
							</div>
						) : null}
						<Heading level='1' align='center'>
							{currentNode?.title}
						</Heading>
						<Badge type='fill' color='gray' title={currentNode?.shortTitle} />
					</>
				}
				placeB={
					<>
						<div className='badge-col'>
							<p>Access level:</p>
							<div className='badges'>
								{badges.access.map(badge => (
									<Badge
										key={badge.title}
										type={badge.type}
										color={badge.color}
										title={badge.title}
									/>
								))}
							</div>
						</div>
						<div className='badge-col'>
							<p>Networks:</p>
							<div className='badges'>
								{badges.networks.map(badge => (
									<Badge
										key={badge.title}
										type={badge.type}
										color={badge.color}
										title={badge.title}
									/>
								))}
							</div>
						</div>
						<div className='badge-col'>
							<p>APIs:</p>
							<div className='badges'>
								{badges.api.map(badge => (
									<Badge
										key={badge.title}
										type={badge.type}
										color={badge.color}
										title={badge.title}
									/>
								))}
							</div>
						</div>
					</>
				}
			/>
		</BoxA>
	);
};

export default FullNodeBox;
