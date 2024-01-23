import StatsArea from '@Features//statsarea';
import { statsApi, userApi } from '@api/redux';

import { useEffect, useRef } from 'react';

// import { useSelector } from 'react-redux';
// import { useLocation, useParams } from 'react-router-dom';
import { useCurrentServer } from '@hooks/settings/useCurrentServer';
import { useSavedPeriod } from '@hooks/settings/useSavedPeriod';
import { useSavedStatsType } from '@hooks/settings/useSavedStatsType';
import { useTrackQuery } from '@hooks/useTrackQuery';

const StatsNodes = () => {
	const receivedUser = userApi.useGetUserQuery();

	const { server } = useCurrentServer(receivedUser);

	const [savedStatsType] = useSavedStatsType();
	const [savedPeriod] = useSavedPeriod();

	const savedPeriodRef = useRef(savedPeriod?.value);
	// const totalRequestsRef = useRef(0);

	useEffect(() => {
		savedPeriodRef.current = savedPeriod?.value;
	}, [savedPeriod?.value]);

	// const limit = useSelector(state => state.dashboard.rateLimit);
	// const interval = 60000 / limit;
	const interval = 5000;

	const _body = {
		dedicated: server?.dedicated_server_name,
		period: savedPeriodRef.current
	};
	const stats = statsApi.useGetStatsQuery(_body, {
		pollingInterval: interval
	});
	// useEffect(() => {
	// 	totalRequestsRef.current = totalRequestsRef.current + 1;
	// }, [stats.fulfilledTimeStamp]);
	const preparedData = stats?.data?.axis_data[savedStatsType?.value];
	const summaryRequests = stats?.data?.axis_data[
		'total_requests'
	]?.[0]?.data.reduce((acc, item) => {
		return acc + item.value;
	}, 0);
	const summaryRequestsFormatted = new Intl.NumberFormat().format(
		Number(summaryRequests)
	);
	const isUserReady = useTrackQuery(stats); // TODO: ошибка???
	const isStatsReady = useTrackQuery(stats);
	if (isUserReady && isStatsReady) {
		if (savedStatsType.value === 'all') {
			return (
				<>
					<StatsArea
						key={'StatsArea1'}
						data={[preparedData[0]]}
						// totalRequests={totalRequestsRef.current}
						totalRequests={summaryRequestsFormatted}
						color={0}
					/>
					<StatsArea
						key={'StatsArea2'}
						data={[preparedData[1]]}
						rps={stats?.data?.rps_now}
						color={1}
					/>
				</>
			);
		} else {
			return (
				<StatsArea
					key={'StatsArea3'}
					data={preparedData}
					// totalRequests={totalRequestsRef.current}
					totalRequests={summaryRequestsFormatted}
					rps={stats?.data?.rps_now}
					color={0}
				/>
			);
		}
	}
};
export default StatsNodes;
