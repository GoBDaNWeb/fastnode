import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';

import { dialogActions } from '@api/redux/slice/dialogSlice';

import ContactForm from '@Widgets/built-forms/contactform';

import useIsDialogOpened from '@hooks/is/useIsDialogOpened';
import useBEM from '@hooks/useBEM';

import './contactdlg.scss';

const ContactDialog = ({ bem = {} }) => {
	const cn = 'contactdlg';
	const [cnfull] = useBEM({ cn, bem });
	const dispatch = useDispatch();
	const id = 'contactDialog';
	const closeHandler = () => {
		dispatch(dialogActions.close(id));
	};
	const isOpened = useIsDialogOpened(id);
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
					<ContactForm containedDialogId={id} />
				</Dialog.Panel>
			</Dialog>
		</Transition>
	);
};

export default ContactDialog;
