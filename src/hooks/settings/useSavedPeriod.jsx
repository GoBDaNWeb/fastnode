import { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useSavedPeriod = periods => {
	const periodsDefault = useMemo(
		() => [
			{ label: '1', value: '1h', units: 'hours' },
			{ label: '6', value: '6h', units: 'hours' },
			{ label: '1', value: '1d', units: 'days' },
			{ label: '7', value: '7d', units: 'days' }
		],
		[]
	);
	const periodsFinally = periods ?? periodsDefault;
	const settings = useSelector(state => state.stats.settings);
	const _savedPeriodSelectOption = periodsFinally.find(
		item => item.value === '1d'
	);
	const savedPeriodSelectOption = settings?.period?.value
		? settings?.period
		: _savedPeriodSelectOption;

	return [savedPeriodSelectOption, periodsFinally];
};
