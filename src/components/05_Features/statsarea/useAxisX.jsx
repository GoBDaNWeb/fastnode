import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

const useAxisX = () => {
	const { t } = useTranslation();
	const primaryAxis = useMemo(
		() => ({
			getValue: datum => {
				const dateString = datum['date'].replace(' ', 'T');
				const datePrepared = new Date(dateString);

				const date = new Date(datePrepared);
				const monthNames = [
					t('month.jan'),
					t('month.feb'),
					t('month.mar'),
					t('month.apr'),
					t('month.may'),
					t('month.jun'),
					t('month.jul'),
					t('month.aug'),
					t('month.sep'),
					t('month.oct'),
					t('month.nov'),
					t('month.dec')
				];
				const ftime = `${String(date.getHours()).padStart(2, '0')}:${String(
					date.getMinutes()
				).padStart(2, '0')}`;
				const fdate = `${monthNames[date.getMonth()]} ${date.getDate()}`;
				const formattedTimeDate = `${ftime} ${fdate}`;
				return formattedTimeDate;
			},
			showGrid: false,
			innerBandPadding: 1,
			outerBandPadding: 0
		}),
		[t]
	);
	return primaryAxis;
};
export default useAxisX;
