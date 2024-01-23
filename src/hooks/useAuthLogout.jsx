import { authActions } from '@api/redux/slice/authSlice';

import { useDispatch } from 'react-redux';

import useCustomAlert from './useCustomAlert';

export const useAuthLogout = () => {
	const dispatch = useDispatch();
	const customAlert = useCustomAlert();
	const signout = cb => {
		customAlert({ type: 'logout_confirm' }).then(result => {
			if (result.isConfirmed) {
				dispatch(authActions.logout());
				if (cb) {
					cb();
				}
			}
		});
	};
	return { signout };
};
