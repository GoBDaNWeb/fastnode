import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import useBEM from '@hooks/useBEM';
import useFldSfx from '@hooks/useFldSfx';

import './_init.scss';

const Textarea = ({ id, name, control, rules, bem = {}, ...rest }) => {
	const { t } = useTranslation();
	const { field, fieldState } = useController({
		name,
		control,
		rules: rules
	});
	const cn = 'textarea';
	const [cnfull] = useBEM({ cn, bem });

	const placeholder = rest.placeholder ? rest.placeholder : t(`field.placeholder.${name}`);

	const [stateSfx] = useFldSfx({ cn, fieldState, rules });
	return (
		<textarea
			{...field}
			{...rest}
			className={`${cnfull}${stateSfx}`}
			id={`${id}-${name}`}
			aria-invalid={!!fieldState.error}
			placeholder={placeholder}
		/>
	);
};

export { Textarea };
