import { lazy, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { nodesApi } from '@api/redux';

import { nodes } from '@data/nodes';

import usePageTitle from '@hooks/usePageTitle';

const FullNodeHeroScreen = lazy(() => import('@Widgets/built-screens/fullnodeheroscreen'));
const PartnerNodeScreen = lazy(() => import('@Widgets/built-screens/partnernodescreen'));
const NodeStepsScreen = lazy(() => import('@Widgets/built-screens/nodestepsscreen'));
const AccessNodeScreen = lazy(() => import('@Widgets/built-screens/accessnodescreen'));
const NodeVideoScreen = lazy(() => import('@Widgets/built-screens/nodevideoscreen'));
const NodePricingScreen = lazy(() => import('@Widgets/built-screens/nodepricingscreen'));
const NodeFaqScreen = lazy(() => import('@Widgets/built-screens/nodefaqscreen'));

const FullNodePage = ({ titleLocale, title }) => {
	const [currentNode, setCurrentNode] = useState(null);
	const { data, isFetching } = nodesApi.useGetNodesQuery();

	usePageTitle(titleLocale, title);
	const loc = useLocation();

	useEffect(() => {
		if (!isFetching) {
			const filterNode = Object.values(data.nodes).filter(node => {
				return loc.pathname.includes(node.coin);
			});
			console.log(filterNode);
			setCurrentNode(filterNode[0]);
		}
	}, [loc.pathname, isFetching]);

	return (
		<>
			<FullNodeHeroScreen currentNode={currentNode} />
			<AccessNodeScreen currentNode={currentNode} />
			<NodeStepsScreen currentNode={currentNode} />
			<PartnerNodeScreen />
			{/* <NodeVideoScreen /> */}
			<NodePricingScreen />
			<NodeFaqScreen currentNode={currentNode} />
		</>
	);
};

export default FullNodePage;
