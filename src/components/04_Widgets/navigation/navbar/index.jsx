import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import Mainmenu from '@Widgets/navigation/mainmenu';
import SchemeBar from '@Widgets/navigation/schemebar';
// import LangToggler from '@Shared/ui/lang-toggler';
import { UsermenuGrd } from '@Widgets/navigation/usermenu';

import Button from '@Shared/ui/button';
import { FramedBox } from '@Shared/ui/framedbox';

import NavigationBar from '@js/classes/NavigationBar';

import { useIsAuth } from '@hooks/is/useIsAuth';
import { useAuthLogout } from '@hooks/useAuthLogout';
import useBEM from '@hooks/useBEM';

import './_init.scss';

const Navbar = ({ bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'navbar';
	const [cnfull] = useBEM({ cn, bem });
	const selfElementRef = useRef();
	const togglerRef = useRef();
	const doc = useRef(document);
	const [toggler, setToggler] = useState(togglerRef.current);
	const [selfElement, setSelfElement] = useState(selfElementRef.current);

	const isAuth = useIsAuth();
	const { signout } = useAuthLogout();

	useEffect(() => {
		setSelfElement(selfElementRef.current);
	}, [selfElementRef]);
	useEffect(() => {
		setToggler(togglerRef.current);
	}, [togglerRef]);

	/* Сам navbar : */
	const jsHelper = useRef();
	useEffect(() => {
		jsHelper.current = new NavigationBar(
			selfElementRef.current,
			{
				closeOnClickMenuItem: true,
				togglerRef: togglerRef.current
			},
			{ tabSelectors: ['.schemebar'] }
		);
	}, [doc, selfElement, toggler]);

	const [nodelistHelper, setNodelistHelper] = useState();

	useEffect(() => {
		jsHelper.current.init();
		jsHelper.current.listen();
		setNodelistHelper(jsHelper.current.trapFocusPrepare());
	}, [jsHelper]);

	useEffect(() => {
		const onKeyDownHandler = e => {
			setTimeout(() => {
				if (e.code == 'Escape') {
					jsHelper.current.trapFocusReset(nodelistHelper);
					jsHelper.current.trapFocusBegin(nodelistHelper);
				}
				if (e.code === 'Tab') {
					jsHelper.current.trapFocus(nodelistHelper);
				}
				if (selfElementRef.current.classList.contains('is-need-trapping')) {
					jsHelper.current.trapFocusReset(nodelistHelper);
				} else {
					jsHelper.current.trapFocusEnd(nodelistHelper);
				}
				if (selfElementRef.current.classList.contains('is-desktop')) {
					jsHelper.current.trapFocusReset(nodelistHelper);
				}
			}, 10);
		};

		document.body.addEventListener('keydown', onKeyDownHandler);

		return () => {
			document.body.removeEventListener('keydown', onKeyDownHandler);
		};
	}, [nodelistHelper]);

	return (
		<div className={`${cnfull}`} ref={selfElementRef}>
			<div className='ctrls-wrap'>
				<div className='burgerbox'>
					<button
						ref={togglerRef}
						className={`btn btn--burger ${cn}-toggler`}
						aria-label={t('navbar.aria-label.toggler')}
					></button>
				</div>
			</div>

			<div className={`${cn}__helper`}>
				<div className={`${cn}__layout`}>
					<FramedBox frame={'navbar'} />

					<nav className={`${cn}__body`}>
						<div className={`${cn}__place ${cn}__place--mainbar`}>
							<Mainmenu />
						</div>
						<div className={`${cn}__place ${cn}__place--extrabar`}>
							<div className={`${cn}__place ${cn}__place--toolbar`}>
								<SchemeBar />
							</div>
							<div className={`${cn}__place ${cn}__place--userbar`}>
								{isAuth ? (
									<UsermenuGrd isAuth={isAuth}>
										<Button
											to='dashboard'
											name='dashboard'
											face='base'
											accent='primary'
											extraClass={`${cn}__extra-link`}
										/>
										<Button
											name='signout'
											face='base'
											accent='secondary'
											icon='signout'
											onClickHandler={signout}
											bem={{ suffix: 'signout' }}
											extraClass={`${cn}__extra-link`}
										/>
									</UsermenuGrd>
								) : (
									<UsermenuGrd>
										<Button
											type='link'
											to='login'
											name='login'
											face='base'
											extraClass={`${cn}__extra-link`}
										/>
										<Button
											type='link'
											to='signup'
											name='register'
											face='base'
											accent='secondary'
											extraClass={`${cn}__extra-link`}
										/>
									</UsermenuGrd>
								)}
							</div>
						</div>
					</nav>
				</div>
			</div>
		</div>
	);
};

export default Navbar;
