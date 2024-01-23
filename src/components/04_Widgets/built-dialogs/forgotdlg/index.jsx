import ForgotForm from '@Widgets/built-forms/forgotform';
import { dialogActions } from '@api/redux/slice/dialogSlice';

import { Dialog, Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';

import useIsDialogOpened from '@hooks/is/useIsDialogOpened';
import useBEM from '@hooks/useBEM';

import './forgotdlg.scss';
import { Fragment } from 'react';

const ForgotDialog = ({ bem = {} }) => {
	const cn = 'forgotdlg';
	const [cnfull] = useBEM({ cn, bem });
	const id = 'forgotDialog';

	const isOpened = useIsDialogOpened(id);
	const dispatch = useDispatch();
	const closeHandler = () => {
		dispatch(dialogActions.close(id));
	};
	return (
		<Transition
			show={isOpened}
			enter='dialog-enter'
			enterFrom='dialog-enter-from'
			enterTo='dialog-enter-to'
			leave='dialog-leave'
			leaveFrom='dialog-leave-from'
			leaveTo='dialog-leave-to'
			as={Fragment}
		>
			<Dialog className={`${cnfull}`} open={isOpened} onClose={closeHandler}>
				<Dialog.Panel className={`${cn}__panel`}>
					<ForgotForm containedDialogId={id} />
				</Dialog.Panel>
			</Dialog>
		</Transition>
	);
};

export default ForgotDialog;
