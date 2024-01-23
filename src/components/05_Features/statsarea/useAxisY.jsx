import { useMemo } from 'react';

const useAxisY = () => {
	const secondaryAxes = useMemo(
		() => [
			{
				getValue: datum => {
					return datum['value'];
				},
				elementType: 'area',
				stacked: false,
				showDatumElements: true
			}
		],
		[]
	);
	return secondaryAxes;
};
export default useAxisY;
