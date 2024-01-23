import { dialogActions } from '@api/redux/slice/dialogSlice';

import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const Assist = ({ name, to, dialogId, bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'assist';
	const [cnfull] = useBEM({ cn, bem });

	const dispatch = useDispatch();
	const clickHandler = () => {
		if (dialogId) dispatch(dialogActions.open(dialogId));
	};
	const _baseUrl = '/';
	return (
		<NavLink
			className={cnfull}
			to={to ? `${_baseUrl}${to}` : ''}
			onClick={clickHandler}
		>
			<span>{t(`assist.caption.${name}`)}</span>
		</NavLink>
	);
};

export { Assist };
