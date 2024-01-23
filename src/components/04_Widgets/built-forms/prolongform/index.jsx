import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { nodeCfgApi, userApi } from '@api/redux';
import { dialogActions } from '@api/redux/slice/dialogSlice';

import { useSubmitProlong } from '@Widgets/built-forms/prolongform/useSubmitProlong';

import { Heading } from '@Shared/typography/heading';
import Button from '@Shared/ui/button';
import { ComponentBox } from '@Shared/ui/componentbox';
import { ZFld } from '@Shared/ui/form-controls/zfld';
import { CtrlsGrd } from '@Shared/ui/layouts/ctrlsgrd';
import { FldsGrid } from '@Shared/ui/layouts/fieldsets';
import { FormGrid } from '@Shared/ui/layouts/forms';

import { useProlongServer } from '@hooks/settings/useProlongServer';
import useBEM from '@hooks/useBEM';
import { useRecaptcha } from '@hooks/useRecaptcha';
import useRules from '@hooks/useRules';
import { useStoreNodeCfg } from '@hooks/useStoreNodeCfg';

import './prolongform.scss';

const ProlongForm = ({ containedDialogId, id, bem = {} }) => {
	const cn = 'prolongform';
	const [cnfull] = useBEM({ cn, bem });
	const { t } = useTranslation();
	const rules = useRules();
	const receivedNodeCfg = nodeCfgApi.useGetDataQuery();
	const receivedUser = userApi.useGetUserQuery();
	const prolongServer = useProlongServer(receivedUser);
	const prolongServerName = prolongServer?.dedicated_server_name;

	const [preparedNodeCfg] = useStoreNodeCfg(receivedNodeCfg);

	const translatedBillingPeriods = preparedNodeCfg?.billing_periods?.map(item => {
		return {
			label: `${t('units.' + item.units, { count: item.label })}`,
			value: item.value
		};
	});
	const payMethods = [
		{
			label: `Pay with Crypto`,
			value: 'crypto'
		},
		{
			label: `Pay with Bank Card`,
			value: 'stripe'
		}
	];

	const dispatch = useDispatch();

	const { control, handleSubmit, reset } = useForm({
		mode: 'onChange',
		defaultValues: {
			billing_period: '',
			pay_method: ''
		},
		values: {
			billing_period: '',
			pay_method: ''
		}
	});

	const { captchaToken } = useRecaptcha('prolong');

	const [dedicateProlong, dedicateProlongState] = nodeCfgApi.useDedicateProlongMutation();
	const submitHelper = useSubmitProlong(receivedNodeCfg, dedicateProlong);
	const submitHandler = data => {
		const _data = { ...data, ...prolongServer, recaptcha_token: captchaToken };
		submitHelper(_data, reset);
	};

	const navigate = useNavigate();
	const closeHandler = useCallback(() => {
		if (containedDialogId) {
			dispatch(dialogActions.close(containedDialogId));
		} else {
			navigate(-1);
		}
	}, [dispatch, containedDialogId, navigate]);

	const isSubmitDisabled = dedicateProlongState?.isLoading || dedicateProlongState?.isSuccess;

	const badgeText = prolongServerName
		? `${prolongServerName} - ${prolongServer?.readable_name}`
		: ' ';
	return (
		<ComponentBox cn={cnfull}>
			<form id={id} onSubmit={handleSubmit(submitHandler)}>
				<FormGrid
					placeUpperControls={<Button onClickHandler={closeHandler} face='bare' icon='cross' />}
					placeHeadbar={
						<Heading level='5' size={'big'} badge={badgeText}>
							{t('prolongform.heading')}
						</Heading>
					}
					placeFootbar={
						<CtrlsGrd justify='end'>
							<Button type='submit' name='choose' disabled={isSubmitDisabled} />
						</CtrlsGrd>
					}
				>
					<FldsGrid>
						<ZFld
							tag='select'
							name='billing_period'
							control={control}
							label={false}
							options={translatedBillingPeriods}
							rules={rules['required']}
						/>
						<ZFld
							tag='select'
							name='pay_method'
							control={control}
							options={payMethods}
							// onChangeHandler={() => handleChangeSetting('pay_method')}
							rules={rules['required']}
						/>
					</FldsGrid>
				</FormGrid>
			</form>
		</ComponentBox>
	);
};

export default ProlongForm;
