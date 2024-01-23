import { useSelector } from 'react-redux';

const useIsDialogOpened = id => {
	const result = useSelector(state =>
		state.dialog.openedIds.some(dlg => dlg === id)
	);
	return Boolean(result);
};

export default useIsDialogOpened;
