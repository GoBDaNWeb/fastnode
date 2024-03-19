import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userApi } from '@api/redux';
import { authActions } from '@api/redux/slice/authSlice';

import { Heading } from '@Shared/typography/heading';
import Button from '@Shared/ui/button';
import { ComponentBox } from '@Shared/ui/componentbox';
import { ZFld } from '@Shared/ui/form-controls/zfld';
import { CtrlsGrd } from '@Shared/ui/layouts/ctrlsgrd';
import { FldsGrid } from '@Shared/ui/layouts/fieldsets';
import { FormGrid } from '@Shared/ui/layouts/forms';
import Preloader from '@Shared/ui/preloader';

import useBEM from '@hooks/useBEM';
import useCustomAlert from '@hooks/useCustomAlert';
import { useRecaptcha } from '@hooks/useRecaptcha';
import useRules from '@hooks/useRules';

import { metricCompleteRegistration } from '@config/metrics';

import './init.scss';

const SignupForm = ({ id, bem = {} }) => {
	let formInitData;
	// if (config.manualDevMode) {
	// 	formInitData = {
	// 		full_name: 'test',
	// 		email: 'test@gmail.com',
	// 		password: 'qwer123',
	// 		confirm_password: 'qwer123'
	// 	};
	// } else {
	// 	formInitData = {
	// 		full_name: '',
	// 		email: '',
	// 		password: '',
	// 		confirm_password: ''
	// 	};
	// }
	formInitData = {
		full_name: '',
		email: '',
		password: '',
		confirm_password: '',
		telegram: ''
	};

	const cn = 'signupform';
	const [cnfull] = useBEM({ cn, bem });
	const { t } = useTranslation();
	const rules = useRules();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const redirectPage = '/dashboard'; // * куда перекидываем после успешной регистрации.

	const customAlert = useCustomAlert();

	const [registration, registrationState] = userApi.useRegistrationMutation();
	const { control, handleSubmit } = useForm({
		mode: 'onChange',
		defaultValues: formInitData
	});

	const $$registrationState = useRef(null);
	$$registrationState.current = registrationState;

	const { captchaToken } = useRecaptcha('registration');

	const submitHelper = async data => {
		const body = {
			email: data.email,
			name: data.full_name,
			password: data.password,
			password_repeat: data.confirm_password,
			telegram: data.telegram,
			recaptcha_token: captchaToken
		};
		await registration(body)
			.unwrap()
			.then(payload => {
				/*  Метрика */
				metricCompleteRegistration();
				/*  */
				customAlert({
					type: 'success',
					timer: 1000
				});
				setTimeout(() => {
					dispatch(authActions.login());
					navigate(redirectPage, { replace: true });
				}, 1000);
			})
			.catch(payload => {
				if ($$registrationState.current.isError) {
					customAlert({
						type: 'error',
						text: $$registrationState.current.error
					});
				}
			});
	};

	const isSubmitDisabled =
		registrationState.isSuccess || registrationState.isLoading || !captchaToken;
	return (
		<ComponentBox cn={cnfull} frame={{ variant: 2 }}>
			{registrationState.isLoading && <Preloader fullScreen={true} size={8} />}
			<form id={id} onSubmit={handleSubmit(submitHelper)}>
				<FormGrid
					placeUpperControls={<Button to={'/'} face='bare' icon='cross' />}
					placeHeadbar={<Heading level='3'>{t('signupform.heading')}</Heading>}
					placeFootbar={
						<CtrlsGrd template='end'>
							<CtrlsGrd>
								<Button name='signup' type='submit' disabled={isSubmitDisabled} />
							</CtrlsGrd>
						</CtrlsGrd>
					}
				>
					<FldsGrid size='0'>
						<ZFld
							tag='input'
							type='text'
							name='full_name'
							control={control}
							rules={rules['full_name']}
						/>
						<ZFld tag='input' type='email' name='email' control={control} rules={rules['email']} />

						<ZFld
							tag='input'
							type='password'
							name='password'
							control={control}
							rules={rules['password']}
						/>
						<ZFld
							tag='input'
							type='password'
							name='confirm_password'
							control={control}
							rules={rules['password']}
						/>
						<ZFld
							tag='input'
							type='text'
							name='telegram'
							control={control}
							rules={rules['telegram']}
						/>
					</FldsGrid>
				</FormGrid>
			</form>
		</ComponentBox>
	);
};

export default SignupForm;
