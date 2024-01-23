import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userApi } from '@api/redux';
import { dialogActions } from '@api/redux/slice/dialogSlice';

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

import './forgotform.scss';

const ForgotForm = ({ containedDialogId, id, bem = {} }) => {
	const cn = 'forgotform';
	const [cnfull] = useBEM({ cn, bem });
	const { t } = useTranslation();
	const rules = useRules();
	const dispatch = useDispatch();

	const { control, handleSubmit } = useForm({
		mode: 'onChange',
		values: {
			email: ''
		},
		defaultValues: {
			email: ''
		}
	});

	const { captchaToken } = useRecaptcha('forgot');
	const [passwordForgot, passwordForgotState] = userApi.usePasswordForgotMutation();

	const [sentedEmail, setSentedEmail] = useState('');

	const submitHelper = async data => {
		const body = {
			email: data.email,
			recaptcha_token: captchaToken
		};
		setSentedEmail(body.email);
		await passwordForgot(body)
			.unwrap()
			.then(result => {
				dispatch(dialogActions.close(containedDialogId));
			});
	};
	const successMessage = `${t('alert.text.password_forgot_success')} ${sentedEmail}</a>`;
	useTrackMutation(passwordForgotState, undefined, true, successMessage);

	const navigate = useNavigate();
	const closeHandler = useCallback(() => {
		if (containedDialogId) {
			dispatch(dialogActions.close(containedDialogId));
		} else {
			navigate(-1);
		}
	}, [dispatch, containedDialogId, navigate]);

	const isSubmitDisabled = passwordForgotState?.isLoading || passwordForgotState?.isSuccess;

	return (
		<ComponentBox cn={cnfull}>
			<form id={id} onSubmit={handleSubmit(submitHelper)}>
				<FormGrid
					placeUpperControls={<Button onClickHandler={closeHandler} face='bare' icon='cross' />}
					placeHeadbar={
						<Heading level='5' size={'big'}>
							{t('forgotform.heading')}
						</Heading>
					}
					placeFootbar={
						<CtrlsGrd>
							<Button type='submit' name='reset_password' disabled={isSubmitDisabled} />
						</CtrlsGrd>
					}
				>
					<FldsGrid>
						<ZFld tag='input' name='email' label={false} control={control} rules={rules['email']} />
					</FldsGrid>
				</FormGrid>
			</form>
		</ComponentBox>
	);
};

export default ForgotForm;
