import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { userApi } from '@api/redux';

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
import { useTrackQuery } from '@hooks/useTrackQuery';

import './personalform.scss';

const PersonalForm = ({ id, bem = {} }) => {
	const cn = 'personalform';
	const [cnfull] = useBEM({ cn, bem });
	const { t } = useTranslation();
	const rules = useRules();
	const receivedUser = userApi.useGetUserQuery();
	const [updateUser, updateState] = userApi.useUpdateUserMutation();

	const { control, handleSubmit, reset } = useForm({
		mode: 'onChange',
		values: {
			full_name: receivedUser?.data?.full_name ?? '',
			email: receivedUser?.data?.email ?? '',
			telegram: receivedUser?.data?.telegram ?? '',
			password: ''
		},
		defaultValues: {
			full_name: receivedUser?.data?.full_name ?? '',
			email: receivedUser?.data?.email ?? '',
			telegram: receivedUser?.data?.telegram ?? '',
			password: ''
		}
	});
	const { captchaToken, refreshCaptcha } = useRecaptcha('updateUser');

	const submitHelper = async data => {
		const body = {
			name: data.full_name ?? '',
			telegram: data.telegram ?? '',
			org: data.org ?? 'fastnode',
			recaptcha_token: captchaToken
		};
		refreshCaptcha();
		await updateUser(body).unwrap();
	};

	useTrackMutation(updateState, undefined, true);

	const [fldsDisabled, setFldsDisabled] = useState(true);
	function editHandler() {
		setFldsDisabled(!fldsDisabled);
	}

	const isReady = useTrackQuery(receivedUser);
	if (isReady) {
		return (
			<ComponentBox cn={cnfull} framed='1' decorator={{ type: 'glow', variant: 'dashboard' }}>
				<form noValidate onSubmit={handleSubmit(submitHelper)}>
					<FormGrid
						placeHeadbar={
							<Heading level='5'>{t('personalform.heading.personal_information')}</Heading>
						}
						placeFootbar={
							<CtrlsGrd justify='end'>
								{!fldsDisabled && (
									<Button
										onClickHandler={reset}
										disabled={updateState?.isLoading}
										type='button'
										name='reset'
										face='pure'
										accent='secondary'
									/>
								)}
								<Button
									onClickHandler={editHandler}
									disabled={updateState?.isLoading}
									type='button'
									name={fldsDisabled ? 'edit' : 'complete_edit'}
									face='pure'
								/>
								<Button disabled={updateState?.isLoading} type='submit' name='save' />
							</CtrlsGrd>
						}
					>
						<FldsGrid size={2}>
							<ZFld
								name='full_name'
								// value={}
								control={control}
								rules={rules['full_name']}
								disabled={fldsDisabled}
							/>
							<ZFld
								name='password'
								type='password'
								control={control}
								// rules={rules['required']}
								disabled={fldsDisabled}
							/>
						</FldsGrid>

						<FldsGrid size={2}>
							<ZFld
								name='email'
								type='email'
								control={control}
								rules={rules['email']}
								disabled={fldsDisabled}
							/>

							<ZFld
								name='telegram'
								control={control}
								rules={rules['telegram']}
								disabled={fldsDisabled}
							/>
						</FldsGrid>
					</FormGrid>
				</form>
			</ComponentBox>
		);
	}
};

export default PersonalForm;
