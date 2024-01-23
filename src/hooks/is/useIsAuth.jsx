import { useSelector } from 'react-redux';

export const useIsAuth = () => {
	const auth = useSelector(state => state.auth);
	return auth.hash ? true : false;
};
