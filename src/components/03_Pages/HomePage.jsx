import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { userActions } from '@api/redux/slice/userSlice';

import Preloader from '@Shared/ui/preloader';

import usePageTitle from '@hooks/usePageTitle';

const IntroScreen = lazy(() => import('@Widgets/built-screens/introscreen'));
const PartnerScreen = lazy(() => import('@Widgets/built-screens/partnerscreen'));
const ProductScreenB = lazy(() => import('@Widgets/built-screens/productscreen-b'));
const AboutScreen = lazy(() => import('@Widgets/built-screens/aboutscreen'));
const NodeScreen = lazy(() => import('@Widgets/built-screens/nodescreen'));
const FeatureScreen = lazy(() => import('@Widgets/built-screens/featurescreen'));
const FBScreen = lazy(() => import('@Widgets/built-screens/fbscreen'));
const ContactDialog = lazy(() => import('@Widgets/built-dialogs/contactdlg'));

const HomePage = ({ titleLocale, title }) => {
	usePageTitle(null, localStorage.getItem('homeTitle'));

	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(userActions.setHomeLoaded(true));
		// * Зафиксировали загрузку главной в хранилище. Необходимо для функций, зависящих от событий полной загрузки главной.
		// ? Прокрутка к блоку на главной, например, происходит только тогда, когда он полностью загружен (а загружен он тогда, когда главная прогрузилась хотя бы раз).
	}, [dispatch]);

	return (
		<>
			<IntroScreen />

			<Suspense
				fallback={<Preloader thickness={2} fullScreen={true} position={'bottom'} size={5} />}
			>
				<PartnerScreen />
				<ProductScreenB />
				<AboutScreen />
				<NodeScreen />
				<FeatureScreen />
				<FBScreen />
				<ContactDialog />
			</Suspense>
		</>
	);
};

export default HomePage;
