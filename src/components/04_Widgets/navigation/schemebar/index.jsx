import { FramedBox } from '@Shared/ui/framedbox';
import SchemeHelper from '@Widgets/navigation/schemebar/SchemeHelper.js';
import { schemeActions } from '@api/redux/slice/schemeSlice';
import { useClickAway } from '@uidotdev/usehooks';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import useBEM from '@hooks/useBEM';

import './_init.scss';

function SchemeBar({ bem = {} }) {
	const { t } = useTranslation();
	const cn = 'schemebar';
	const [cnfull] = useBEM({ cn, bem });

	const dispatch = useDispatch();
	const currentScheme = useSelector(state => state.scheme.currentScheme);

	const [jsHelper] = useState(new SchemeHelper());

	useEffect(() => {
		jsHelper.setupSwitcher();
		jsHelper.setupScheme();
	}, [jsHelper]);

	function handleChange(e) {
		dispatch(schemeActions.setScheme(e.target.value));
	}

	useEffect(() => {
		jsHelper.setScheme(currentScheme);
	}, [jsHelper, currentScheme]);

	const headcaptionRef = useRef(null);

	const [isOpen, setIsOpen] = useState(false);
	const [isOver, setIsOver] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const ref = useClickAway(() => {
		setIsOpen(false);
	});

	const handleClick = useCallback(() => {
		if (isOpen === false) {
			setIsOpen(true);
			setIsClosing(false);
		} else {
			setIsOpen(false);
		}
	}, [isOpen]);

	const handleKey = e => {
		if (e.code === 'Space' || e.code === 'Enter') {
			if (isOpen === false) {
				setIsOpen(true);
				setIsClosing(false);
			} else {
				setIsOpen(false);
			}
		}
	};
	const handleBackClick = () => {
		if (isOpen === true) {
			setIsOpen(false);
		}
		setIsClosing(true);
	};
	const handleBackKey = e => {
		if (e.code === 'Space' || e.code === 'Enter') {
			if (isOpen === true) {
				setIsOpen(false);
			}
			setIsClosing(true);
			headcaptionRef.current.focus();
		}
	};
	const handleOver = () => {
		if (isOver === false) {
			setIsOver(true);
			setIsClosing(false);
		}
	};
	const handleOut = () => {
		if (isOver === true) {
			setIsOver(false);
		}
	};

	useEffect(() => {
		const onKeyPressHandler = (e, header) => {
			if (isOpen && e.code === 'Escape') {
				setIsOpen(false);
			}
		};
		document.body.addEventListener('keydown', onKeyPressHandler);
		return () => {
			document.body.removeEventListener('keydown', onKeyPressHandler);
		};
	}, [isOpen]);

	return (
		<div ref={ref} className={cnfull} data-current-scheme={currentScheme}>
			<input
				className='schemebar-checkbox-opening'
				name='schemebar-submenu'
				id='schemebar-opening'
				checked={isOpen}
				onChange={handleClick}
				type='checkbox'
				tabIndex={-1}
			/>
			<input
				className='schemebar-checkbox-over-opening'
				name='schemebar-submenu'
				id='schemebar-over-opening'
				checked={isOver}
				onChange={handleOver}
				type='checkbox'
				tabIndex={-1}
			/>
			<input
				className='schemebar-checkbox-closing'
				name='schemebar-submenu'
				id='schemebar-closing'
				checked={isClosing}
				onChange={handleOut}
				type='checkbox'
				tabIndex={-1}
			/>
			<div className={`${cn}__place ${cn}__place--headcaption`}>
				<label
					ref={headcaptionRef}
					onClick={handleClick}
					onMouseEnter={handleOver}
					onMouseLeave={handleOut}
					onKeyUp={handleKey}
					tabIndex={0}
					className={`${cn}__headcaption`}
					// htmlFor='schemebar-opening'
					// ! Если включть htmlFor то перестанет работать из-за повторного срабатывания
				>
					<span>{t('schemebar.headcaption')}</span>
				</label>
			</div>

			<div className={`${cn}__place ${cn}__place--switcher`}>
				<div className={`${cn}__controlbar`}>
					<label
						onClick={handleBackClick}
						onKeyUp={handleBackKey}
						tabIndex={isOpen || isOver ? 0 : -1}
						className={`${cn}__control`} /*  htmlFor='schemebar-opening' */
					>
						<span>{t('schemebar.control.back')}</span>
					</label>

					<div className={`${cn}__caption`}>
						<span>{t('schemebar.headcaption')}</span>
					</div>
				</div>
				<fieldset className={`${cn}__switcher switcher`}>
					<legend className='switcher__legend'>
						{t('schemebar.headcaption')}
					</legend>
					<div className='switcher__field'>
						<input
							// ref={radioLight}
							onChange={handleChange}
							name='color-scheme'
							id='color-scheme-light'
							value='light'
							aria-label={t('schemebar.label.light')}
							type='radio'
							className='switcher__radio switcher__radio--light'
							tabIndex={isOpen || isOver ? 0 : -1}
							// onBlur={handleBlur}
						/>
						<label
							className='switcher__label'
							htmlFor='color-scheme-light'
							tabIndex={-1}
						>
							<span>{t('schemebar.label.light')}</span>
						</label>
					</div>
					<div className='switcher__field'>
						<input
							// ref={radioAuto}
							onChange={handleChange}
							name='color-scheme'
							id='color-scheme-system'
							value='auto'
							aria-label={t('schemebar.label.system')}
							type='radio'
							className='switcher__radio switcher__radio--auto'
							tabIndex={isOpen || isOver ? 0 : -1}
						/>
						<label
							className='switcher__label'
							htmlFor='color-scheme-system'
							tabIndex={-1}
						>
							<span>{t('schemebar.label.system')}</span>
						</label>
					</div>
					<div className='switcher__field'>
						<input
							// ref={radioDark}
							onChange={handleChange}
							name='color-scheme'
							id='color-scheme-dark'
							value='dark'
							aria-label={t('schemebar.label.dark')}
							type='radio'
							className='switcher__radio switcher__radio--dark'
							tabIndex={isOpen || isOver ? 0 : -1}
						/>
						<label
							className='switcher__label'
							htmlFor='color-scheme-dark'
							tabIndex={-1}
						>
							<span>{t('schemebar.label.dark')}</span>
						</label>
					</div>
					<div className='switcher__status'></div>
				</fieldset>
				<FramedBox frame={'navbar'} />
			</div>
		</div>
	);
}
export default SchemeBar;
