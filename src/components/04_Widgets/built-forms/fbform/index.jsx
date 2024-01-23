import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { freeApi } from '@api/redux';
import { fbActions } from '@api/redux/slice/fbSlice';

import { Heading } from '@Shared/typography/heading';
import Button from '@Shared/ui/button';
import { ComponentBox } from '@Shared/ui/componentbox';
import { ZFld } from '@Shared/ui/form-controls/zfld';
import { CtrlsGrd } from '@Shared/ui/layouts/ctrlsgrd';
import { FldsGrid } from '@Shared/ui/layouts/fieldsets';
import { FormGrid } from '@Shared/ui/layouts/forms';

import useBEM from '@hooks/useBEM';
import { useRecaptcha } from '@hooks/useRecaptcha';
import useRules from '@hooks/useRules';
import { useTrackMutation } from '@hooks/useTrackMutation';

import { metricSendMessage } from '@config/metrics';

import './fbform.scss';

const FBForm = ({ id, bem = {} }) => {
	const cn = 'fbform';
	const [cnfull] = useBEM({ cn, bem });
	const { t } = useTranslation();
	const dispatch = useDispatch();

	const rules = useRules();
	const fbData = useSelector(state => state.fb.data);

	const { control, handleSubmit, getValues } = useForm({
		mode: 'onChange',
		values: {
			first_name: fbData?.first_name ?? '',
			last_name: fbData?.last_name ?? '',
			email: fbData?.email ?? '',
			telegram: fbData?.telegram ?? '',
			message: fbData?.message ?? ''
		},
		defaultValues: {
			first_name: '',
			last_name: '',
			email: '',
			telegram: '',
			message: ''
		}
	});
	const { captchaToken, refreshCaptcha } = useRecaptcha('feedback');

	const [feedbackSend, feedbackSendState] = freeApi.useFeedbackSendMutation();

	const submitHelper = async data => {
		const tg = data.telegram ? ` @${data.telegram}` : '';
		const body = {
			name: data.first_name + ' ' + data.last_name + tg,
			email: data.email,
			text: data.message,
			recaptcha_token: captchaToken
			// telegram: data.telegram
		};
		awayHandler();
		const currentScroll = window.scrollY;
		document.documentElement.style.scrollBehavior = 'auto';
		refreshCaptcha();
		await feedbackSend(body)
			.unwrap()
			.then(res => {
				if (res?.status === true) {
					/*  Метрика */
					metricSendMessage();
					/*  */
					dispatch(fbActions.clearTemp());
					dispatch(fbActions.clearAll());
				}
			})
			.catch(error => {
				//
			})
			.finally(() => {
				window.scrollTo(0, currentScroll);
				document.documentElement.style.scrollBehavior = 'smooth';
			});
	};

	useTrackMutation(feedbackSendState, undefined, true);

	const changeHandler = useCallback(() => {
		dispatch(fbActions.saveTemp({ data: getValues() }));
	}, [dispatch, getValues]);

	const awayHandler = useCallback(() => {
		dispatch(fbActions.moveTempToAll({ data: getValues() }));
	}, [dispatch, getValues]);

	useEffect(() => {
		return () => {
			awayHandler(); // При размонтировании выполняем awayHandler
		};
	}, [awayHandler]);

	return (
		<ComponentBox cn={cnfull}>
			<form id={id} onChange={changeHandler} onSubmit={handleSubmit(submitHelper)}>
				<FormGrid
					placeHeadbar={
						<Heading level='5' size={'big'}>
							{t('fbform.heading')}
						</Heading>
					}
					placeFootbar={
						<CtrlsGrd>
							<Button type='submit' name='send_message' disabled={feedbackSendState?.isLoading} />
						</CtrlsGrd>
					}
				>
					<FldsGrid size='2'>
						<ZFld
							tag='input'
							type='text'
							name='first_name'
							label={false}
							control={control}
							rules={rules['first_name']}
						/>

						<ZFld
							tag='input'
							type='text'
							name='last_name'
							control={control}
							label={false}
							rules={rules['last_name']}
						/>
					</FldsGrid>

					<FldsGrid>
						<ZFld
							tag='input'
							type='text'
							name='email'
							label={false}
							control={control}
							rules={rules['email']}
						/>
						<ZFld
							tag='input'
							type='text'
							name='telegram'
							control={control}
							label={false}
							rules={rules['telegram']}
						/>
						<ZFld
							tag='textarea'
							name='message'
							control={control}
							label={false}
							rules={rules['message']}
						/>
					</FldsGrid>
				</FormGrid>
			</form>
		</ComponentBox>
	);
};

export default FBForm;
