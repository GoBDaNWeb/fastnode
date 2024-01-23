import { userActions } from '@api/redux/slice/userSlice';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import useBEM from '@hooks/useBEM';

import './_init.scss';

function elemOffsetTop(node) {
	if (!node) return 0;
	let coords = node.getBoundingClientRect();
	return coords.top + window.pageYOffset;
}
function elemOffsetBottom(node) {
	if (!node) return 0;
	let coords = node.getBoundingClientRect();
	return coords.bottom + window.pageYOffset;
}

const td = helperName => {
	const _tdHelpers = {
		scroller: {
			now: Date.now(),
			timeout: null,
			lastCall: 0,
			delay: 100
		}
	};
	return ({ onTransition, onStart, onStop }) => {
		onStart();
		if (
			_tdHelpers[helperName].now >
			_tdHelpers[helperName].lastCall + _tdHelpers[helperName].delay
		) {
			onTransition();
			_tdHelpers[helperName].lastCall = _tdHelpers[helperName].now;
		}
		clearTimeout(_tdHelpers[helperName].timeout);
		_tdHelpers[helperName].timeout = setTimeout(() => {
			onStop();
			onTransition();
		}, _tdHelpers[helperName].delay);
	};
};

const Mainmenu = ({ bem = {} }) => {
	const { t } = useTranslation();
	const loc = useLocation();

	const cn = 'mainmenu';
	const [cnfull] = useBEM({ cn, bem });
	const mainmenuRef = useRef(null);
	const targetElRef = useRef(null);
	const activeMenuItemRef = useRef(null);
	const [allLinks, setAllLinks] = useState([]);
	const [hasScrolling, setHasScrolling] = useState(false);
	const [hasChangedHash, setHasChangedHash] = useState(false);
	const dispatch = useDispatch();
	/* Навигация по хэшу */
	const homeLoaded = useSelector(state => state.user.homeLoaded);
	const goToScreen = useCallback(
		hash => {
			// setTimeout(() => {

			// if (!hasScrolling) {
			if (hash) {
				targetElRef.current = document.body.querySelector(`${hash}`);
				activeMenuItemRef.current = document.body.querySelector(`${hash}`);
				if (targetElRef.current) {
					activeMenuItemRef.current = mainmenuRef.current.querySelector(
						`[href*='${hash}']`
					);
					if (allLinks?.length) {
						allLinks.forEach(item => {
							item.classList.remove('active');
						});
						activeMenuItemRef.current.classList.add('active');
						targetElRef.current.scrollIntoView();
					}
				}
			}
			// }

			// }, 250);
		},
		[allLinks]
	);
	const clicking = useCallback(
		e => {
			for (let i = allLinks.length - 1; i >= 0; i--) {
				allLinks[i].classList.remove('clicked');
			}
			if (Array.from(allLinks).includes(e.target)) {
				e.target.classList.add('clicked');
				// setTimeout(() => {
				goToScreen(e.target.hash);
				// }, 0);
			}
		},
		[allLinks, goToScreen]
	);
	const activate = useCallback(
		current => {
			for (let i = allLinks.length - 1; i >= 0; i--) {
				allLinks[i].classList.remove('active');
			}
			current.classList.add('active');
			current.classList.remove('clicked');
		},
		[allLinks]
	);
	const deactivate = useCallback(() => {
		for (let i = allLinks.length - 1; i >= 0; i--) {
			allLinks[i].classList.remove('active');
		}
	}, [allLinks]);

	useEffect(() => {
		setAllLinks(mainmenuRef.current.querySelectorAll(`a`)); // Находим все ссылки в меню и заносим в state
	}, []);
	const prevHash = useSelector(state => state.user.previousHash);
	useEffect(() => {
		// ? При изменении HASH в адресной строке осуществляем переход к нужному экрану

		// Если нет процесса scroll на данный момент, то переходим к нужному экрану
		if (homeLoaded === true) {
			if (loc.hash !== prevHash) {
				goToScreen(loc.hash);
				setTimeout(() => {
					dispatch(userActions.setPreviousHash(loc.hash));
				}, 10);
			}
		}
	}, [loc.hash, goToScreen, dispatch, prevHash, homeLoaded]);

	/* ScrollSpy : начало */
	useEffect(() => {
		mainmenuRef.current.addEventListener('click', clicking);

		const scrollHelper = td('scroller');
		const scrollHandler = () => {
			scrollHelper({
				onStart: () => setHasScrolling(true),
				onStop: () => setHasScrolling(false),
				onTransition: () => {
					let linkedContent;
					let currentPosY = window.pageYOffset ?? window.scrollY;
					for (let i = allLinks.length - 1; i >= 0; i--) {
						let itemForActivate;
						let menuItemHash = allLinks[i].hash;
						let linkedContentId = menuItemHash.replace(/#/g, '');
						if (menuItemHash.includes(linkedContentId)) {
							itemForActivate = allLinks[i];
							// Получаем соответствующий пункт меню
						}
						linkedContent = document.body.querySelector('#' + linkedContentId);
						if (
							currentPosY >=
								elemOffsetTop(linkedContent) - window.innerHeight / 2 &&
							currentPosY <=
								elemOffsetBottom(linkedContent) - window.innerHeight / 2
						) {
							activate(itemForActivate);
							break;
						} else {
							deactivate();
						}
					}
				}
			});
		};
		window.addEventListener('scroll', scrollHandler);
		return () => {
			window.removeEventListener('scroll', scrollHandler);
		};
	}, [loc.hash, goToScreen, allLinks, activate, clicking, deactivate]);
	/* ScrollSpy : конец */
	useEffect(() => {}, [hasScrolling]);

	return (
		<ul className={`${cnfull}`} ref={mainmenuRef}>
			<li className={`${cn}__listitem`}>
				<Link className={`${cn}__link`} to='/#partners'>
					{t('mainmenu.items.partners')}
				</Link>
			</li>
			<li className={`${cn}__listitem`}>
				<Link className={`${cn}__link`} to='/#products'>
					{t('mainmenu.items.products')}
				</Link>
			</li>
			<li className={`${cn}__listitem`}>
				<Link className={`${cn}__link`} to='/#about'>
					{t('mainmenu.items.about')}
				</Link>
			</li>
			<li className={`${cn}__listitem`}>
				<Link className={`${cn}__link`} to='/#nodes'>
					{t('mainmenu.items.nodes')}
				</Link>
			</li>
			<li className={`${cn}__listitem`}>
				<Link className={`${cn}__link`} to='/#contact'>
					{t('mainmenu.items.contacts')}
				</Link>
			</li>
		</ul>
	);
};

export default Mainmenu;
