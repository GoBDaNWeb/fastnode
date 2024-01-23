import { nodeCfgActions } from '@api/redux/slice/nodeCfgSlice';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import isEmpty from 'lodash/isEmpty';

export const useStoreNodeCfg = received => {
	const dispatch = useDispatch();

	useEffect(() => {
		if (received.isSuccess && !isEmpty(received.data)) {
			dispatch(nodeCfgActions.saveData(received.data));
		}
	}, [received, dispatch]);
	const blockchains = useSelector(state => state.nodeCfg.prepared.blockchains);
	const networks = useSelector(state => state.nodeCfg.prepared.networks);
	const node_types = useSelector(state => state.nodeCfg.prepared.node_types);
	const billing_periods = useSelector(
		state => state.nodeCfg.prepared.billing_periods
	);

	const prepared = {
		blockchains,
		networks,
		node_types,
		billing_periods
	};

	return [prepared, received];
};
