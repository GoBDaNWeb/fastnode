import { lazy } from 'react';

import usePageTitle from '@hooks/usePageTitle';

const HeroNodesScreen = lazy(() => import('@Widgets/built-screens/heronodesscreen'));
const NodesListScreen = lazy(() => import('@Widgets/built-screens/nodeslistscreen'));

const NodesPage = ({ titleLocale, title }) => {
	usePageTitle(titleLocale, title);

	return (
		<>
			<HeroNodesScreen />
			<NodesListScreen />
		</>
	);
};

export default NodesPage;
