import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { freeApi } from '@api/redux';
import { dialogActions } from '@api/redux/slice/dialogSlice';
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

import { metricSendContact } from '@config/metrics';

import './contactform.scss';

const ContactForm = ({ id, containedDialogId, bem = {} }) => {
	const cn = 'contactform';
	const dispatch = useDispatch();

	const fbData = useSelector(state => state.fb.data);
	const rules = useRules();

	const [cnfull] = useBEM({ cn, bem });
	const { t } = useTranslation();
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

	const { captchaToken, refreshCaptcha } = useRecaptcha('contactform');

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
					metricSendContact();
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

	const openHandler = useCallback(() => {
		dispatch(fbActions.moveTempToAll({ data: getValues() }));
	}, [dispatch, getValues]);

	useEffect(() => {
		openHandler();
	}, [openHandler]);

	const awayHandler = useCallback(() => {
		dispatch(fbActions.moveTempToAll({ data: getValues() }));
	}, [dispatch, getValues]);

	const closeHandler = useCallback(() => {
		awayHandler();
		dispatch(dialogActions.close(containedDialogId));
	}, [dispatch, containedDialogId, awayHandler]);

	const changeHandler = useCallback(() => {
		dispatch(fbActions.saveTemp({ data: getValues() }));
	}, [dispatch, getValues]);

	useEffect(() => {
		return () => {
			awayHandler(); // При размонтировании выполняем awayHandler
		};
	}, [awayHandler]);

	return (
		<ComponentBox cn={cnfull} frame={{ variant: 1 }}>
			<form id={id} onChange={changeHandler} onSubmit={handleSubmit(submitHelper)}>
				<FormGrid
					placeUpperControls={<Button onClickHandler={closeHandler} face='bare' icon='cross' />}
					placeHeadbar={
						<Heading level='3' size={'big'}>
							{t('fbform.heading')}
						</Heading>
					}
					placeFootbar={
						<CtrlsGrd justify='end'>
							<Button type='submit' name='send_message' disabled={feedbackSendState?.isLoading} />
						</CtrlsGrd>
					}
				>
					<FldsGrid size={2}>
						<ZFld
							tag='input'
							type='text'
							name='first_name'
							control={control}
							rules={rules['first_name']}
						/>
						<ZFld
							tag='input'
							type='text'
							name='last_name'
							control={control}
							rules={rules['last_name']}
						/>
					</FldsGrid>
					<FldsGrid>
						<ZFld tag='input' type='text' name='email' control={control} rules={rules['email']} />
						<ZFld
							tag='input'
							type='text'
							name='telegram'
							control={control}
							rules={rules['telegram']}
						/>
						<ZFld tag='textarea' name='message' control={control} rules={rules['message']} />
					</FldsGrid>
				</FormGrid>
			</form>
		</ComponentBox>
	);
};

export default ContactForm;
