import { lazy, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

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

	usePageTitle(titleLocale, title);
	const loc = useLocation();

	useEffect(() => {
		const filterNode = nodes.filter(node => {
			return node.link === loc.pathname;
		});
		setCurrentNode(filterNode[0]);
	}, [loc.pathname]);

	return (
		<>
			<FullNodeHeroScreen currentNode={currentNode} />
			<AccessNodeScreen />
			<NodeStepsScreen />
			<PartnerNodeScreen />
			<NodeVideoScreen />
			<NodePricingScreen />
			<NodeFaqScreen />
		</>
	);
};

export default FullNodePage;
