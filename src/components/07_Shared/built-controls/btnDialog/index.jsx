import Button from '@Shared/ui/button';
import { dialogActions } from '@api/redux/slice/dialogSlice';

import { useDispatch } from 'react-redux';

const ButtonDialog = ({ name }) => {
	const dispatch = useDispatch();

	return (
		<Button
			name={name}
			onClickHandler={() => dispatch(dialogActions.open('contactDialog'))}
		/>
	);
};

export default ButtonDialog;
