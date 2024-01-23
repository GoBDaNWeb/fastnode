import Swal from 'sweetalert2';

import { useTranslation } from 'react-i18next';

import 'sweetalert2/src/sweetalert2.scss';

const useCustomAlert = settings => {
	const { t } = useTranslation();

	const defaultSettings = {
		position: 'bottom-start',
		backdrop: false,
		showCloseButton: true,
		timerProgressBar: true,
		showConfirmButton: false,
		// timer: 3000,
		allowOutsideClick: false
	};
	let timerInterval;
	function padStart(number, targetLength, padChar = '0') {
		const str = String(number);
		if (str.length >= targetLength) {
			return str;
		}
		const paddedStr = padChar.repeat(targetLength - str.length) + str;
		return paddedStr;
	}

	function smartTimer() {
		Swal.showLoading();
		const b = Swal.getHtmlContainer().querySelector('b');
		const totalMilliseconds = Swal.getTimerLeft();
		const minutes = Math.floor(totalMilliseconds / 60000);
		const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
		const milliseconds = (totalMilliseconds % 1000)
			.toString()
			.padStart(3, '0')
			.slice(0, 2);
		b.textContent = `${padStart(minutes)}:${padStart(seconds)}:${milliseconds}`;
		timerInterval = setInterval(() => {
			const remainingMilliseconds = Swal.getTimerLeft();
			const remainingSeconds = Math.floor(
				(remainingMilliseconds % 60000) / 1000
			);
			const remainingMillisecondsFormatted = (remainingMilliseconds % 1000)
				.toString()
				.padStart(3, '0')
				.slice(0, 2);
			b.textContent = `${padStart(
				remainingSeconds
			)}:${remainingMillisecondsFormatted}`;
		}, 100);
	}

	const _startSettings = { ...defaultSettings, ...settings };
	const go = ({ type, ...rest }) => {
		let _options = {};
		switch (type) {
			case 'loading':
				_options = {
					position: 'bottom-start',
					didOpen: () => {
						Swal.showLoading();
					},
					title: 'Loading...',
					timer: rest.timer ?? 5000
				};
				break;
			// case 'blocked_external_link':
			// 	_options = {
			// 		position: 'center',
			// 		icon: 'warning',
			// 		title: t('alert.title.blocked_external_link'),
			// 		html: `${t('alert.text.blocked_external_link')} <b></b>`,
			// 		showCloseButton: false,
			// 		showConfirmButton: true,
			// 		timer: 3000,
			// 		confirmButtonText: t('button.caption.open_inside'),
			// 		timerProgressBar: true,
			// 		didOpen: () => {
			// 			smartTimer();
			// 		},
			// 		willClose: () => {
			// 			clearInterval(timerInterval);
			// 		}
			// 	};
			// 	break;
			case 'dedicated_new_external':
				_options = {
					position: 'bottom-start',
					title: t('alert.title.dedicated_new_external'),
					icon: 'success',
					showCloseButton: false,
					showConfirmButton: true,
					confirmButtonText: t('button.caption.go_to_payment'),
					timer: 2000,
					html: `${t('alert.text.dedicated_new_external')} <b></b>`,
					timerProgressBar: true,
					didOpen: () => {
						smartTimer();
					},
					willClose: () => {
						clearInterval(timerInterval);
					}
				};
				break;
			case 'dedicated_new_confirm':
				_options = {
					position: 'center',
					title: t('alert.title.dedicated_new_confirm'),
					icon: 'info',
					showConfirmButton: true,
					showCancelButton: true,
					buttonsStyling: false,
					confirmButtonText: t('button.caption.yes'),
					cancelButtonText: t('button.caption.no')
				};
				break;
			case 'user_profile_update_success':
				_options = {
					position: 'center',
					title: t('alert.title.user_profile_update_success'),
					icon: 'success',
					timer: 2000
				};
				break;
			case 'login_success':
				_options = {
					position: 'center',
					title: t('alert.title.login_success'),
					icon: 'success',
					timer: 1000
				};
				break;
			case 'logout_confirm':
				_options = {
					position: 'center',
					title: t('alert.title.logout_confirm'),
					icon: 'question',
					showConfirmButton: true,
					showCancelButton: true,
					buttonsStyling: false,
					confirmButtonText: t('button.caption.yes'),
					cancelButtonText: t('button.caption.no')
				};
				break;
			case 'logout_success':
				_options = {
					position: 'center',
					title: t('alert.title.logout_success'),
					icon: 'success',
					timer: 1000
				};
				break;
			case 'success':
				_options = {
					title: t('alert.title.success'),
					icon: 'success',
					timer: rest.timer ?? 2000
				};
				break;
			case 'warning':
				_options = {
					title: t('alert.title.warning'),
					icon: 'warning'
				};
				break;
			case 'nodata':
				_options = {
					title: t('alert.title.nodata'),
					icon: 'info',
					timer: 2000
				};
				break;
			case 'error':
				_options = {
					title: t('alert.title.error'),
					icon: 'error',
					timer: rest.timer ?? 2000
				};
				break;
			default:
				_options = {};
		}
		const _finalSettings = {
			..._startSettings,
			..._options,
			...rest
		};
		// resultCustomAlert.current = Swal.fire({ ..._finalSettings });
		// return resultCustomAlert.current;
		return Swal.fire({ ..._finalSettings });
	};

	return go;
};

export default useCustomAlert;
