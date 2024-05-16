import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { nodesApi } from '@api/redux';

import SchemeHelper from '@Widgets/navigation/schemebar/SchemeHelper.js';

import { Heading } from '@Shared/typography/heading';
import Badge from '@Shared/ui/badge';
import { BoxA } from '@Shared/ui/boxa';
import BoxGrd from '@Shared/ui/layouts/boxgrd';
import PictureSet from '@Shared/ui/pictureset';

import useBEM from '@hooks/useBEM';

import './nodesherobox.scss';

const NodesHeroBox = ({ heading, heading2, icon, icon2, badges, bem = {} }) => {
	const cn = 'nodesherobox';
	const [cnfull] = useBEM({ cn, bem });
	const [jsHelper] = useState(new SchemeHelper());
	const [simplePrice, setSimplePrice] = useState('');
	const [archivalPrice, setArchivalPrice] = useState('');
	const currentScheme = useSelector(state => state.scheme.currentScheme);
	const { data, isFetching } = nodesApi.useGetNodesQuery();

	useEffect(() => {
		if (!isFetching) {
			let minSimple = Object.values(data.prices.full).reduce((prev, current) => {
				return prev.price < current.price ? prev : current;
			});
			let minArchival = Object.values(data.prices.archive).reduce((prev, current) => {
				return prev.price < current.price ? prev : current;
			});
			setSimplePrice(minSimple);
			setArchivalPrice(minArchival);
		}
	}, [isFetching]);

	return (
		<BoxA cls={cnfull}>
			<BoxGrd
				placeA={
					<>
						<div className={`${cn}__services`}>
							<Heading level={3} icon={icon}>
								{heading}
							</Heading>
							<div className='badges'>
								{badges.map(badge => (
									<Badge
										key={badge.title}
										title={badge.title}
										color={badge.color}
										type={badge.type}
									/>
								))}
							</div>
						</div>
						<div className={`${cn}__prices`}>
							<Heading level={3} icon={icon2}>
								{heading2}
							</Heading>
							<div className='price-nodes'>
								<div className='simple'>
									<p>Simple Nodes: start</p> <span className='big'>{simplePrice?.price}</span>
									<span className='small'>usd</span>
								</div>
								<div className='archival'>
									<p>Archival Nodes: start</p>
									<span className='big'>{archivalPrice?.price}</span>
									<span className='small'>usd</span>
								</div>
							</div>
						</div>
					</>
				}
				placeB={
					<div data-theme={currentScheme === 'auto' ? jsHelper.getSystemScheme() : currentScheme}>
						<PictureSet
							dimension={[
								{
									bp: 'sm',
									src: `nodes/nodes@2x`
								},
								{
									bp: 'xl',
									src: `nodes/nodes@2x`
								}
							]}
							retinaSrc={`nodes/nodes@2x`}
							types={['jpg']}
							alt={'dedicated nodes image'}
							width={624}
							height={416}
						/>
					</div>
				}
			/>
		</BoxA>
	);
};

export default NodesHeroBox;
