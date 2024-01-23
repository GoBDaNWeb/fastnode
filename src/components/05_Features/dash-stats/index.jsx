// import Button from '@Shared/ui/button';
import StatsNodes from '@Features//stats-nodes';
import { ComponentBox } from '@Shared/ui/componentbox';
import { ZFld } from '@Shared/ui/form-controls/zfld';
import Toolbar from '@Shared/ui/tools/toolbar';
import Toolset from '@Shared/ui/tools/toolset';
import { userApi } from '@api/redux';
import { statsActions } from '@api/redux/slice/statsSlice';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { useSavedPeriod } from '@hooks/settings/useSavedPeriod';
import { useSavedStatsType } from '@hooks/settings/useSavedStatsType';
import useBEM from '@hooks/useBEM';
import { useTrackQuery } from '@hooks/useTrackQuery';

import './_init.scss';

/*
 * Тут временно закомментированы кнопки в статистике. И в импортах Button. Не удалять!
 */

const DashStats = ({ nodeName, id, bem = {} }) => {
	const cn = 'dashstats';
	const [cnfull] = useBEM({ cn, bem });
	const { t } = useTranslation();
	const receivedUser = userApi.useGetUserQuery();
	const [savedPeriod, periodsOpts] = useSavedPeriod();
	const [savedStatsType, statsTypesOpts] = useSavedStatsType();
	const translatedPeriodsOpts = periodsOpts.map(item => {
		return {
			label: `${t('units.' + item.units, { count: Number(item.label) })}`,
			value: item.value
		};
	});

	const translatedSavedPeriod = translatedPeriodsOpts.find(
		item => item.value === savedPeriod?.value
	);

	const { control, getValues } = useForm({
		mode: 'onChange',
		values: {
			stats_type: savedStatsType ?? '',
			period: translatedSavedPeriod ?? ''
		},
		defaultValues: {
			stats_type: savedStatsType ?? '',
			period: translatedSavedPeriod ?? ''
		}
	});
	const dispatch = useDispatch();
	function handleChangeSetting(name, value) {
		const preparedValue = value ?? getValues(name);
		dispatch(statsActions.setOne({ name, value: preparedValue }));
	}
	useEffect(() => {
		return () => {
			dispatch(statsActions.saveSettings()); // Сохраняем настройки при размонтировании (уходе со стр.)
		};
	}, [dispatch]);

	const isUserReady = useTrackQuery(receivedUser);
	if (isUserReady) {
		return (
			<ComponentBox
				cn={cnfull}
				frame={0}
				placeToolbar={
					<Toolbar
						dir='c;c;r'
						// start={
						// 	<Toolset fill='60,40;auto;min'>
						// 		<Button face={'pure'} accent={'secondary'} name={'all'} />
						// 		<Button face={'pure'}>Solana</Button>
						// 	</Toolset>
						// }
						end={
							<Toolset fill='auto' dir='c;r'>
								<ZFld
									tag='select'
									name='stats_type'
									label={false}
									control={control}
									options={statsTypesOpts}
									onChangeHandler={() => handleChangeSetting('stats_type')}
									// value={settings?.blockchain}
									// isMulti={true}
									// onChangeHandler={e => {
									// 	blockchainChangeHandler(e);
									// }}
								/>
								{/* <ZFld
									tag='select'
									name='select_b'
									control={control}
									options={receivedUser?.data['select_b']}
									label={false}
								/> */}

								<ZFld
									tag='select'
									name='period'
									control={control}
									label={false}
									options={translatedPeriodsOpts}
									onChangeHandler={() => handleChangeSetting('period')}
								/>
							</Toolset>
						}
					/>
				}
			>
				<StatsNodes />
			</ComponentBox>
		);
	}
};

export default DashStats;
