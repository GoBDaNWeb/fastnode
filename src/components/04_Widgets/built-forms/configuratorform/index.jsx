import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { nodeCfgApi, userApi } from '@api/redux';
import { nodeCfgActions } from '@api/redux/slice/nodeCfgSlice';

import { v4 as uuidv4 } from 'uuid';

import { Heading } from '@Shared/typography/heading';
import Button from '@Shared/ui/button';
import { ComponentBox } from '@Shared/ui/componentbox';
import Divider from '@Shared/ui/divider';
import { ZFld } from '@Shared/ui/form-controls/zfld';
import { CtrlsGrd } from '@Shared/ui/layouts/ctrlsgrd';
import { FldsGrid } from '@Shared/ui/layouts/fieldsets';
import { FormGrid } from '@Shared/ui/layouts/forms';

import useBEM from '@hooks/useBEM';
import { useRecaptcha } from '@hooks/useRecaptcha';
import useRules from '@hooks/useRules';
import { useStoreNodeCfg } from '@hooks/useStoreNodeCfg';
import { useStoredSettings } from '@hooks/useStoredSettings';
import { useTrackQuery } from '@hooks/useTrackQuery';

import './configuratorform.scss';
import { useRequestFreeTest } from './useRequestFreeTest';
import { useSubmitNodeCfg } from './useSubmitNodeCfg';

const ConfiguratorForm = ({ id, bem = {} }) => {
	const cn = 'configuratorform';
	const [cnfull] = useBEM({ cn, bem });
	const { t } = useTranslation();
	const rules = useRules();
	const dispatch = useDispatch();
	const receivedNodeCfg = nodeCfgApi.useGetDataQuery();
	const [preparedNodeCfg] = useStoreNodeCfg(receivedNodeCfg);
	const receivedUser = userApi.useGetUserQuery();

	const [dedicatedNew, dedicatedNewState] = nodeCfgApi.useDedicatedNewMutation();
	const [dedicatedFree, dedicatedFreeState] = nodeCfgApi.useDedicatedFreeMutation();
	const [savedSettings] = useStoredSettings('nodeCfg', [
		'blockchain',
		'network',
		'node_type',
		'api_key',
		'billing_period',
		'pay_method'
	]);
	const translatedBillingPeriods = preparedNodeCfg?.billing_periods?.map(item => {
		return {
			label: `${t('units.' + item.units, { count: item.label })}`,
			value: item.value
		};
	});
	const payMethods = [
		{
			label: `Crypto`,
			value: 'crypto'
		},
		{
			label: `Bank Card`,
			value: 'stripe'
		}
	];
	const { control, handleSubmit, getValues, reset, trigger } = useForm({
		mode: 'onChange',
		values: {
			node_type: savedSettings.node_type ?? '',
			blockchain: savedSettings.blockchain ?? '',
			network: savedSettings.network ?? '',
			api_key: savedSettings.api_key ?? '',
			billing_period: savedSettings.billing_period ?? '',
			pay_method: savedSettings.pay_method ?? ''
		},
		defaultValues: {
			node_type: '',
			blockchain: '',
			network: '',
			api_key: '',
			billing_period: '',
			pay_method: ''
		}
	});

	const { captchaToken: orderCaptchaToken, refreshCaptcha: refreshCaptchaOrder } =
		useRecaptcha('order');
	const { captchaToken: freeCaptchaToken, refreshCaptcha: refreshCaptchaFree } =
		useRecaptcha('freetest');

	function handleChangeBlockchain() {
		const blockchain = getValues('blockchain');
		dispatch(nodeCfgActions.setBlockchain(blockchain));
	}
	function handleChangeSetting(name, value) {
		const preparedValue = value ?? getValues(name);
		dispatch(nodeCfgActions.setSetting({ name, value: preparedValue }));
	}
	useEffect(() => {
		return () => {
			dispatch(nodeCfgActions.saveSettings()); // Сохраняем настр. при размонтир. (уходе со стр.)
		};
	}, [dispatch]);
	const submitHelper = useSubmitNodeCfg(receivedNodeCfg, dedicatedNew);
	const freeTestHelper = useRequestFreeTest(dedicatedFree, dedicatedFreeState);
	const submitHandler = data => {
		const _data = { ...data, recaptcha_token: orderCaptchaToken };
		submitHelper(_data, reset);
		refreshCaptchaOrder();
	};

	const freeTestHandler = async () => {
		const triggerResult = await trigger(['node_type', 'network', 'blockchain']);
		const _data = {
			blockchain: getValues('blockchain'),
			network: getValues('network'),
			node_type: getValues('node_type'),
			recaptcha_token: freeCaptchaToken
		};
		if (triggerResult) freeTestHelper(_data);
	};

	//
	const isUserReady = useTrackQuery(receivedUser);
	const isNodeCfgReady = useTrackQuery(receivedNodeCfg);
	if (isUserReady && isNodeCfgReady) {
		return (
			<ComponentBox cn={cnfull} framed='1' decorator={{ type: 'glow', variant: 'dashboard' }}>
				<form id={id} onSubmit={handleSubmit(submitHandler)}>
					<FormGrid
						placeHeadbar={
							<Heading level='5'>{t('configuratorform.heading.choose_settings')}</Heading>
						}
						placeFootbar={
							<CtrlsGrd justify='end'>
								<Button
									type='button'
									// name='free_test'

									accent={'secondary'}
									caption={'free test'}
									onClickHandler={freeTestHandler}
									disabled={dedicatedFreeState?.isLoading || dedicatedFreeState?.isSuccess}
								/>
								<Button type='submit' name='calculate' disabled={dedicatedNewState?.isLoading} />
							</CtrlsGrd>
						}
					>
						<FldsGrid size={2}>
							<ZFld
								tag='select'
								name='blockchain'
								isSearchable={true}
								control={control}
								options={preparedNodeCfg?.blockchains}
								rules={rules['required']}
								onChangeHandler={handleChangeBlockchain}
							/>
							<ZFld
								tag='select'
								name='network'
								// isMulti={true}
								control={control}
								options={preparedNodeCfg.networks}
								rules={rules['required']}
								disabled={!preparedNodeCfg?.networks?.length}
								onChangeHandler={() => handleChangeSetting('network')}
								placeholder={
									preparedNodeCfg?.networks?.length
										? t(`field.placeholder.network_on`)
										: t(`field.placeholder.network_off`)
								}
							/>
						</FldsGrid>

						<Divider />

						<FldsGrid heading={t('configuratorform.heading.node_type')}>
							{preparedNodeCfg?.node_types?.map(item => {
								return (
									<ZFld
										key={uuidv4()}
										tag='input'
										type='radio'
										name={'node_type'}
										value={item.value}
										disabled={item.disabled}
										onChangeHandler={() => handleChangeSetting('node_type', item.value)}
										locale={{
											name: item.caption,
											caption: item.caption,
											description: item.caption
										}}
										control={control}
										rules={rules['required']}
									/>
								);
							})}
						</FldsGrid>

						<Divider />

						<FldsGrid size='3'>
							<ZFld
								tag='select'
								name='api_key'
								control={control}
								options={receivedUser?.data?.apikeys}
								onChangeHandler={() => handleChangeSetting('api_key')}
								rules={rules['required']}
							/>

							<ZFld
								tag='select'
								name='billing_period'
								control={control}
								options={translatedBillingPeriods}
								onChangeHandler={() => handleChangeSetting('billing_period')}
								rules={rules['required']}
							/>
							<ZFld
								tag='select'
								name='pay_method'
								control={control}
								options={payMethods}
								onChangeHandler={() => handleChangeSetting('pay_method')}
								rules={rules['required']}
							/>
						</FldsGrid>
					</FormGrid>
				</form>
			</ComponentBox>
		);
	}
};

export default ConfiguratorForm;
