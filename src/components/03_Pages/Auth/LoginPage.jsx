import ForgotDialog from '@Widgets/built-dialogs/forgotdlg';
import AuthScreen from '@Widgets/built-screens/authscreen';

import usePageTitle from '@hooks/usePageTitle';

const LoginPage = ({ titleLocale, title }) => {
	usePageTitle(titleLocale, title);

	return (
		<>
			<AuthScreen type='login' />
			<ForgotDialog />
		</>
	);
};

export default LoginPage;
