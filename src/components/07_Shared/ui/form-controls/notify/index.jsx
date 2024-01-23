import { useController } from 'react-hook-form';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const Notify = ({ name, control, bem = {} }) => {
	const cn = 'notify';
	const [cnfull] = useBEM({ cn, bem });
	const { field, rules, fieldState } = useController({
		name,
		control
	});
	return (
		<span className={`${cnfull}`}>
			<span className={`${cn}__caption`}>
				{fieldState.invalid && fieldState.error?.message}
			</span>
		</span>
	);
};

export { Notify };
