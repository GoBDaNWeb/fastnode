import ChartGrd from '@Shared/ui/layouts/chartgrd';
import Score from '@Shared/ui/score';

import { Chart } from 'react-charts';
import { useTranslation } from 'react-i18next';

import isEmpty from 'lodash/isEmpty';

import useBEM from '@hooks/useBEM';

import './statsarea.scss';
import useAxisX from './useAxisX';
import useAxisY from './useAxisY';
import useStatsAreaRenderSvg from './useStatsAreaRenderSvg';

const StatsArea = ({ id, data, totalRequests, rps, color = 0, bem = {} }) => {
	const cn = 'statsarea';
	const [cnfull] = useBEM({ cn, bem });
	const { t } = useTranslation();

	const primaryAxis = useAxisX();
	const secondaryAxes = useAxisY();

	const renderSVGHelper = useStatsAreaRenderSvg();
	if (!isEmpty(data)) {
		// const total =
		// 	data.reduce((acc, item) => {
		// 		return acc + item.data.length;
		// 	}, 0) ?? 0;
		return (
			<div className={`${cnfull}`}>
				<ChartGrd
					toolbar={
						<>
							{totalRequests && (
								<Score
									caption={`${t('elements.total_requests')}:`}
									value={totalRequests}
								/>
							)}
							{rps && (
								<Score
									caption={`RPS:`}
									value={Number(rps).toFixed(1).split('.').join(',')}
								/>
							)}
						</>
					}
				>
					<Chart
						className={`${cn}__chart`}
						options={{
							data,
							primaryAxis,
							secondaryAxes,
							padding: {
								left: -12,
								right: -24
							},
							initialWidth: 825,
							initialHeight: 280,

							getSeriesStyle: series => {
								return {
									fill: `url("#area-gradient-${color}")`,
									strokeWidth: 2,
									stroke: `url("#stroke-gradient-${color}")`
								};
							},
							renderSVG: renderSVGHelper
						}}
					/>
				</ChartGrd>
			</div>
		);
	}
};

export default StatsArea;
