import { FooterContent, HeaderContent, MainContent } from '@contents';
import { Footer, Header, Main, Template } from '@template';

import { Suspense } from 'react';
import { useEffect } from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { userActions } from '@api/redux/slice/userSlice';

import Copyright from '@Entities/common/copyright';
import Socials from '@Entities/common/socials';

import Preloader from '@Shared/ui/preloader';

import pixelperfect from '@utils/development/js/dev-utils';

import config from '@config';

const GlobalOut = () => {
	useEffect(() => {
		if (config.dev) {
			pixelperfect(); // Dev
		}
	}, []);
	const dispatch = useDispatch();
	dispatch(userActions.setHomeLoaded('globalOutLoaded'));
	const handleBeforeUnload = useCallback(() => {
		dispatch(userActions.setHomeLoaded(false));
	}, [dispatch]);
	useEffect(() => {
		window.addEventListener('beforeunload', handleBeforeUnload);
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [handleBeforeUnload]);
	return (
		<Template>
			<Header>
				<HeaderContent />
			</Header>
			<Main>
				<MainContent>
					<Suspense fallback={<Preloader fullScreen={true} size={8} />}>
						<Outlet />
					</Suspense>
				</MainContent>
			</Main>
			<Footer>
				<FooterContent
					placeA={<Socials bem={{ prefix: 'footer' }} />}
					placeB={<Copyright bem={{ prefix: 'footer' }} />}
				></FooterContent>
			</Footer>
		</Template>
	);
};

export default GlobalOut;
