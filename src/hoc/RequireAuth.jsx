import { Navigate, useLocation } from 'react-router-dom';

import { useIsAuth } from '@hooks/is/useIsAuth';

const RequireAuth = ({ children }) => {
	const location = useLocation();
	const isAuth = useIsAuth();
	if (!isAuth) {
		return <Navigate to='/login' state={{ from: location }} />;
	}
	return children;
};
const RequireExited = ({ children }) => {
	const location = useLocation();
	const redirectPage = location?.state?.from?.pathname
		? location?.state?.from?.pathname
		: '/dashboard';

	const isAuth = useIsAuth();
	if (!isAuth) {
		return children;
	} else {
		return <Navigate to={redirectPage} state={{ from: location }} />;
	}
};
export { RequireAuth, RequireExited };
