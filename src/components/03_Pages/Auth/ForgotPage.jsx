import AuthScreen from '@Widgets/built-screens/authscreen';

import usePageTitle from '@hooks/usePageTitle';

const ForgotPage = ({ titleLocale, title }) => {
	usePageTitle(titleLocale, title);

	return (
		<>
			<AuthScreen type='forgot' />
		</>
	);
};

export default ForgotPage;
