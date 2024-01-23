import { userApi } from '@api/redux';
import queryString from 'query-string';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const useCurrentServer = (_payload, key) => {
	const location = useLocation();
	const params = queryString.parse(location.search);
	const { name } = params;
	const receivedUser = userApi.useGetUserQuery();
	const payload = _payload ? _payload : receivedUser;
	const actualServers = payload?.data?.dedicated_servers?.filter(
		item => item.status === 'ACTIVE'
	);
	const [server, setServer] = useState(
		actualServers?.length ? actualServers[0] : {}
	);
	const [blockchain, setBlockchain] = useState({});
	const [isExist, setIsExist] = useState(false);
	useEffect(() => {
		if (payload.isSuccess) {
			const isExist = payload?.data?.dedicated_servers?.some(
				item => item.dedicated_server_name === name
			);
			setIsExist(isExist);
			// const actualServers = payload?.data?.dedicated_servers?.filter(
			// 	item => item.status === 'ACTIVE'
			// );
			const actualServers = payload?.data?.dedicated_servers; // ! Сделал показ всех сереров, а не только оплаченных
			const defaultServer = actualServers[0];
			const server = isExist
				? actualServers.find(item => item.dedicated_server_name === name)
				: defaultServer;
			setServer(server);
			const blockchain = payload?.data?.dedicated_servers_select_data?.find(
				item => item.value === server?.blockchain
			);
			setBlockchain(blockchain);
		}
	}, [payload, name]);
	return { blockchain, server, isExist };
};
