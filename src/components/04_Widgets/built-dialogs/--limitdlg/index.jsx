import LimitForm from 'src/Components/04_Widgets/built-forms/--limitform';
import { dialogActions } from '@api/redux/slice/dialogSlice';

import { Dialog } from '@headlessui/react';
import { useDispatch } from 'react-redux';

import useIsDialogOpened from '@hooks/is/useIsDialogOpened';
import useBEM from '@hooks/useBEM';

import './limitdlg.scss';

const LimitDialog = ({ bem = {} }) => {
	const cn = 'limitdlg';
	const [cnfull] = useBEM({ cn, bem });
	const id = 'limitDialog';

	const isOpened = useIsDialogOpened(id);
	const dispatch = useDispatch();
	const closeHandler = () => {
		dispatch(dialogActions.close(id));
	};
	return (
		<Dialog className={`${cnfull}`} open={isOpened} onClose={closeHandler}>
			<Dialog.Panel className={`${cn}__panel`}>
				<LimitForm containedDialogId={id} />
			</Dialog.Panel>
		</Dialog>
	);
};

export default LimitDialog;
