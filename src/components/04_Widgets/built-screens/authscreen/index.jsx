import Screen from '@Shared/screen';
import ScreenGrd from '@Shared/ui/layouts/screengrd';
import ForgotForm from '@Widgets/built-forms/forgotform';
import LoginForm from '@Widgets/built-forms/loginform';
import SignupForm from '@Widgets/built-forms/signupform';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const AuthScreen = ({ type = 'login', bem = {} }) => {
	const cn = 'authscreen';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<Screen cls={cnfull} decorator={{ type: 'hexagon', variant: 'auth' }}>
			<ScreenGrd>
				{type === 'login' && <LoginForm />}
				{type === 'signup' && <SignupForm />}
				{type === 'forgot' && <ForgotForm />}
			</ScreenGrd>
		</Screen>
	);
};

export default AuthScreen;
