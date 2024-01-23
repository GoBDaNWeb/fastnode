import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { userApi } from '@api/redux';
import { authActions } from '@api/redux/slice/authSlice';

import { Heading } from '@Shared/typography/heading';
import Button from '@Shared/ui/button';
import { ComponentBox } from '@Shared/ui/componentbox';
import { Assist } from '@Shared/ui/form-controls/assist';
import { ZFld } from '@Shared/ui/form-controls/zfld';
import { CtrlsGrd } from '@Shared/ui/layouts/ctrlsgrd';
import { FldsGrid } from '@Shared/ui/layouts/fieldsets';
import { FormGrid } from '@Shared/ui/layouts/forms';
import Preloader from '@Shared/ui/preloader';

import useBEM from '@hooks/useBEM';
import useCustomAlert from '@hooks/useCustomAlert';
import { useRecaptcha } from '@hooks/useRecaptcha';
import useRules from '@hooks/useRules';

import config from '@config';
import { metricCompleteLogin } from '@config/metrics';

import './_init.scss';

const LoginForm = ({ id, bem = {} }) => {
	let formInitData;
	if (config.manualDevMode) {
		formInitData = {
			// email: 'yanovskiynv@gmail.com',
			// password: '12345+abc' //

			email: 'test@gmail.com',
			password: 'qwer123'
		};
	} else {
		formInitData = {
			email: '',
			password: ''
		};
	}
	// formInitData = {
	// 	email: '',
	// 	password: ''
	// };
	const cn = 'loginform';
	const [cnfull] = useBEM({ cn, bem });
	const { t } = useTranslation();
	const rules = useRules();
	const navigate = useNavigate();
	const location = useLocation(); // * Если после успешной авторизации хотим переходить на страницу, адрес
	const fromPage = location.state?.from?.pathname || '/'; // * которой ввели в строке браузера до редиректа.
	const dispatch = useDispatch();
	const [login, loginState] = userApi.useLoginMutation();

	const $$loginState = useRef(null);
	$$loginState.current = loginState;

	const customAlert = useCustomAlert();
	const { control, handleSubmit } = useForm({
		mode: 'onChange',
		defaultValues: formInitData
	});

	const { captchaToken } = useRecaptcha('login');

	const submitHelper = async data => {
		const body = {
			email: data.email,
			password: data.password,
			recaptcha_token: captchaToken
		};
		await login(body)
			.unwrap()
			.then(payload => {
				if ($$loginState.current.isSuccess) {
					/*  Метрика */
					metricCompleteLogin();
					/*  */
					customAlert({
						type: 'login_success',
						timer: 1000
					});
					setTimeout(() => {
						dispatch(authActions.login());
						navigate(fromPage, { replace: true });
					}, 1000);
				}
			})
			.catch(payload => {
				if ($$loginState.current.isError) {
					customAlert({
						type: 'error',
						text: $$loginState.current.error
					});
				}
			});
	};

	/*
	 * Кнопки закомментированы временно! Не удалять!
	 */
	const isSubmitDisabled = loginState.isSuccess || loginState.isLoading || !captchaToken;

	return (
		<ComponentBox cn={cnfull} frame={{ variant: 2 }}>
			{loginState.isLoading && <Preloader fullScreen={true} size={8} />}
			<form id={id} onSubmit={handleSubmit(submitHelper)}>
				<FormGrid
					placeUpperControls={<Button to={'/'} face='bare' icon='cross' />}
					placeHeadbar={<Heading level='3'>{t('loginform.heading')}</Heading>}
					placeFootbar={
						// <CtrlsGrd template='auto---end'>
						<CtrlsGrd template='end'>
							{/* <CtrlsGrd>
								<Button
									face='pure'
									accent='secondary'
									caption={false}
									svg='logo-fox'
								/>
								<Button
									face='pure'
									accent='secondary'
									caption={false}
									svg='logo-shield'
								/>
								<Button
									face='pure'
									accent='secondary'
									caption={false}
									svg='logo-toncoin'
								/>
							</CtrlsGrd> */}

							<CtrlsGrd>
								<Button name='login' type='submit' disabled={isSubmitDisabled} />
							</CtrlsGrd>
						</CtrlsGrd>
					}
				>
					<FldsGrid size='0'>
						<ZFld tag='input' type='email' name='email' control={control} rules={rules['email']} />

						<ZFld
							tag='input'
							type='password'
							name='password'
							control={control}
							rules={rules['password']}
							assist={
								<Assist
									name={'forgot_password'}
									// to={'forgot'}
									dialogId={'forgotDialog'}
								/>
							}
						/>
						<CtrlsGrd template='end'>
							{/* <div className='recaptcha-wrap'> */}
							{/* <ReCAPTCHA
								className='recaptcha-wrap'
								sitekey='6Leu6oMoAAAAAHF5EFA9pVk4ASZgL6RYlq5p-MYw'
								onChange={e => setCaptchaValue(e)}
								theme='dark'
								// size='invisible'
								// type='image'
							/> */}
							{/* </div> */}
						</CtrlsGrd>
					</FldsGrid>
				</FormGrid>
			</form>
		</ComponentBox>
	);
};

export default LoginForm;
