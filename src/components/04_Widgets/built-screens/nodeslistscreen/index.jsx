import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { nodesApi } from '@api/redux';

import SchemeHelper from '@Widgets/navigation/schemebar/SchemeHelper.js';

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
	const [jsHelper] = useState(new SchemeHelper());
	const { data, isFetching } = nodesApi.useGetNodesQuery();

	useEffect(() => {
		if (!isFetching) {
			setVisibleNodes(Object.values(data.nodes).slice(0, 7));
		}
	}, [isFetching]);

	const showMore = () => {
		setVisibleNodes(prev => [
			...prev,
			...Object.values(data.nodes).slice(visibleNodes.length, visibleNodes.length + 5)
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
								node={node}
								key={node.title}
								link={node.link}
								heading={node.title}
								badges={node.badges}
								img={
									(jsHelper.getSystemScheme() === 'light' && node.imgDark) ||
									(currentScheme === 'light' && node.imgDark)
										? node.imgDark
										: node.img
								}
							/>
						))}
					</>
				}
				placeB={
					<>
						{!isFetching &&
						visibleNodes &&
						visibleNodes.length === Object.values(data.nodes).length ? null : (
							<Button onClickHandler={showMore} type='button' name={'more_nodes'} />
						)}
					</>
				}
			></ScreenGrd>
		</Screen>
	);
};

export default NodesListScreen;
