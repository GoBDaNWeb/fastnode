import { useSelector } from 'react-redux';

export const useProlongServer = (payload, key) => {
	const _prolongServerName = useSelector(
		state => state.dashboard.prolongServer
	);
	// const actualServers = payload?.data?.dedicated_servers?.filter(
	// 	item => item.status === 'ACTIVE'
	// );
	const actualServers = payload?.data?.dedicated_servers;
	const isExist = actualServers.some(
		item => item.dedicated_server_name === _prolongServerName
	);
	const prolongServer = isExist
		? actualServers.find(
				item => item.dedicated_server_name === _prolongServerName
		  )
		: 'not exist';

	return prolongServer;
};
