import { Heading } from '@Shared/typography/heading';
import Button from '@Shared/ui/button';
import { ComponentBox } from '@Shared/ui/componentbox';
import { ZFld } from '@Shared/ui/form-controls/zfld';
import { CtrlsGrd } from '@Shared/ui/layouts/ctrlsgrd';
import { FldsGrid } from '@Shared/ui/layouts/fieldsets';
import { FormGrid } from '@Shared/ui/layouts/forms';
import { userApi } from '@api/redux';
import { dashboardActions } from '@api/redux/slice/dashboardSlice';
import { dialogActions } from '@api/redux/slice/dialogSlice';

import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import useBEM from '@hooks/useBEM';
import useCustomAlert from '@hooks/useCustomAlert';
import useRules from '@hooks/useRules';
import { useTrackQuery } from '@hooks/useTrackQuery';

import './limitform.scss';

/*
 * Возможно эта форма еще пригодится для кнопки Set Limit в статистике
 */

const LimitForm = ({ containedDialogId, id, bem = {} }) => {
	const cn = 'limitform';
	const [cnfull] = useBEM({ cn, bem });
	const { t } = useTranslation();
	const rules = useRules();
	const dispatch = useDispatch();
	const rateLimit = useSelector(state => state.dashboard.rateLimit);

	//dedicated_servers_select
	//
	// const receivedNodeCfg = nodeCfgApi.useGetDataQuery();
	// const [preparedNodeCfg] = useStoreNodeCfg(receivedNodeCfg);
	// const receivedUser = userApi.useGetUserQuery();

	const customALert = useCustomAlert();

	function handleSave(data) {
		const currentLimit = data ?? getValues('limit');

		if (rateLimit !== currentLimit) {
			dispatch(dashboardActions.setRateLimit(currentLimit));
			dispatch(dialogActions.close(containedDialogId));
			customALert({ type: 'success', timer: 1000 });
		} else {
			customALert({
				icon: 'info',
				html: `${t('alert.text.nothing_changed')}`,
				timer: 1000
			});
		}
	}

	const { control, handleSubmit, reset, getValues } = useForm({
		mode: 'onChange',
		values: {
			limit: rateLimit ?? ''
		},
		defaultValues: {
			limit: rateLimit ?? ''
		}
	});

	const submitHelper = data => {
		handleSave(data.limit);
	};

	const navigate = useNavigate();
	const closeHandler = useCallback(() => {
		if (containedDialogId) {
			dispatch(dialogActions.close(containedDialogId));
		} else {
			navigate(-1);
		}
	}, [dispatch, containedDialogId, navigate]);

	return (
		<ComponentBox cn={cnfull}>
			<form id={id} onSubmit={handleSubmit(submitHelper)}>
				<FormGrid
					placeUpperControls={
						<Button onClickHandler={closeHandler} face='bare' icon='cross' />
					}
					placeHeadbar={
						<Heading level='5' size={'big'}>
							{t('limitform.heading')}
						</Heading>
					}
					placeFootbar={
						<CtrlsGrd justify='end'>
							<Button type='submit' name='save' />
						</CtrlsGrd>
					}
				>
					<FldsGrid>
						<ZFld
							tag='text'
							type='number'
							name='limit'
							// isSearchable={true}
							control={control}
							rules={rules['limit']}
							min={1}
							max={180}
						/>
					</FldsGrid>
				</FormGrid>
			</form>
		</ComponentBox>
	);
};

export default LimitForm;
