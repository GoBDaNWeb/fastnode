import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import NodesListItem from '@Entities/nodeslistitem';

import Screen from '@Shared/screen';
import Button from '@Shared/ui/button';
import ScreenGrd from '@Shared/ui/layouts/screengrd';

import { nodes } from '@data/nodes';

import useBEM from '@hooks/useBEM';

import './nodeslistscreen.scss';

const NodesListScreen = ({ bem = {} }) => {
	const [visibleNodes, setVisibleNodes] = useState(null);
	const cn = 'nodeslistscreen';
	const [cnfull] = useBEM({ cn, bem });
	const currentScheme = useSelector(state => state.scheme.currentScheme);
	useEffect(() => {
		setVisibleNodes(nodes.slice(0, 7));
	}, []);

	const showMore = () => {
		setVisibleNodes(prev => [
			...prev,
			...nodes.slice(visibleNodes.length, visibleNodes.length + 5)
		]);
	};

	return (
		<Screen id={'list'} cls={cnfull}>
			<ScreenGrd
				placeA={
					<>
						<div className='rectangle1'></div>
						<div className='rectangle2'></div>
						{visibleNodes?.map(node => (
							<NodesListItem
								key={node.title}
								link={node.link}
								heading={node.title}
								badges={node.badges}
								img={currentScheme === 'light' && node.imgDark ? node.imgDark : node.img}
							/>
						))}
					</>
				}
				placeB={
					<>
						<Button onClickHandler={showMore} type='button' name={'more_nodes'} />
					</>
				}
			></ScreenGrd>
		</Screen>
	);
};

export default NodesListScreen;
