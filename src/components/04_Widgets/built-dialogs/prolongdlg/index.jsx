import ProlongForm from '@Widgets/built-forms/prolongform';
import { dashboardActions } from '@api/redux/slice/dashboardSlice';
import { dialogActions } from '@api/redux/slice/dialogSlice';

import { Dialog, Transition } from '@headlessui/react';
import { useDispatch } from 'react-redux';

import useIsDialogOpened from '@hooks/is/useIsDialogOpened';
import useBEM from '@hooks/useBEM';

import { Fragment } from 'react';

import './prolongdlg.scss';

const ProlongDialog = ({ bem = {} }) => {
	const cn = 'prolongdlg';
	const [cnfull] = useBEM({ cn, bem });
	const id = 'prolongDialog';

	const isOpened = useIsDialogOpened(id);
	const dispatch = useDispatch();
	const closeHandler = () => {
		dispatch(dashboardActions.resetProlongServer());
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
			<Dialog className={`${cnfull}`} onClose={closeHandler}>
				<Dialog.Panel className={`${cn}__panel`}>
					<ProlongForm containedDialogId={id} />
				</Dialog.Panel>
			</Dialog>
		</Transition>
	);
};

export default ProlongDialog;
