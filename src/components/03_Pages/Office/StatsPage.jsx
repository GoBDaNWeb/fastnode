/*
 ! Закомметирован временно отключенный функционал (в импортах тоже). Не удалять пока!
 */
import { userApi } from '@api/redux';

import OfficeGrid from '@out/OfficeGrid';

// import LimitDialog from '@Widgets/built-dialogs/limitdlg';
import ProlongDialog from '@Widgets/built-dialogs/prolongdlg';
import Tabbar from '@Widgets/navigation/tabbar';

import DashStats from '@Features//dash-stats';
import NodeInfo from '@Features//nodeinfo';

import EndHeadBox from '@Entities/endheadbox';

import Plaque from '@Shared/typography/plaque';
import Button from '@Shared/ui/button';

// import { dialogActions } from '@api/redux/slice/dialogSlice';
// import { useDispatch } from 'react-redux';
import { useCurrentServer } from '@hooks/settings/useCurrentServer';
import usePageTitle from '@hooks/usePageTitle';

// import Toolbar from '@Shared/ui/tools/toolbar';
// import Toolset from '@Shared/ui/tools/toolset';
/*
 ! Закомметирован временно отключенный функционал (в импортах тоже). Не удалять пока!
 */
const StatsPage = ({ titleLocale, title }) => {
	// *
	const receivedUser = userApi.useGetUserQuery();
	const { blockchain, server } = useCurrentServer(receivedUser);
	usePageTitle(titleLocale, server?.readable_name);

	// const dialogId = 'limitDialog';
	// const dispatch = useDispatch();
	// const clickHandler = () => {
	// 	if (dialogId) dispatch(dialogActions.open(dialogId));
	// };
	/*
 ! Закомметирован временно отключенный функционал (в импортах тоже). Не удалять пока!
 */
	return (
		<OfficeGrid
			// toolbar={
			// 	<Toolset fill='auto,min;min' justify={'end'}>
			// 		<Button
			// 			face={'pure'}
			// 			accent={'secondary'}
			// 			name={'set_limit'}
			// 			onClickHandler={clickHandler}
			// 		/>
			// 		{/* <Button face={'pure'} caption={false} icon={'key'} /> */}
			// 		{/* <Button face={'pure'} caption={false} icon={'more'} /> */}
			// 	</Toolset>
			// }
			heading={server?.readable_name}
			headingSub={
				<EndHeadBox /* title={'solana'} */ /*  status={'active'} */>
					<Plaque color='bluebird'>{server?.group}</Plaque>
					<Button caption={false} face={'bare'} icon={'circle-question'} />
				</EndHeadBox>
			}
		>
			<Tabbar
				defaultTab={0}
				statistic={<DashStats></DashStats>}
				endpoints={<NodeInfo data={server} btnStats={false} />}
			/>
			{/* <LimitDialog /> */}
			<ProlongDialog />
		</OfficeGrid>
	);
};

export default StatsPage;
