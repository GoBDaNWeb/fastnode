import AuthScreen from '@Widgets/built-screens/authscreen';

import usePageTitle from '@hooks/usePageTitle';

const SignupPage = ({ titleLocale, title }) => {
	usePageTitle(titleLocale, title);

	return <AuthScreen type='signup' />;
};

export default SignupPage;
