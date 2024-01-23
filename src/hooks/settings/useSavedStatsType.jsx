import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useSavedStatsType = (payload, key) => {
	const typesDefault = useMemo(
		() => [
			{
				label: 'All',
				value: 'all'
			},
			{
				label: 'Total Requests',
				value: 'total_requests'
			},
			{
				label: 'RPS',
				value: 'rps'
			}
		],
		[]
	);
	const typesFinally = payload ?? typesDefault;
	const settings = useSelector(state => state.stats.settings);
	const _savedTypeSelectOptionDefault = typesFinally.find(
		item => item.value === 'all'
	);
	const savedTypeSelectOption = settings?.stats_type?.value
		? settings?.stats_type
		: _savedTypeSelectOptionDefault;

	return [savedTypeSelectOption, typesFinally];
};
