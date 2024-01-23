import { useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import useBEM from '@hooks/useBEM';
import useFldSfx from '@hooks/useFldSfx';

import './_init.scss';

const Input = ({
	id,
	name,
	type = 'text',
	control,
	autocomplete = 'off',
	rules,
	bem = {},
	onChangeHandler = () => {},
	...rest
}) => {
	const { t } = useTranslation();
	const { field, fieldState, formState } = useController({
		name,
		control,
		rules: rules
	});
	const cn = 'input';
	const [cnfull] = useBEM({ cn, bem });
	const typeSfx = type ? ` ${cn}--${type}` : '';

	const isCheckboxOrRadio =
		type === 'checkbox' || type === 'radio' ? true : false;

	const placeholderPrepared = rest.placeholder
		? rest.placeholder
		: t(`field.placeholder.${name}`);
	const placeholder = !isCheckboxOrRadio
		? { placeholder: placeholderPrepared }
		: '';

	const [stateSfx] = useFldSfx({ cn, fieldState, rules });
	const disabledSfx = rest.disabled ? ` ${cn}--disabled` : '';
	const dataChecked =
		type === 'checkbox' ? { 'data-checked': field.value } : '';

	const radioDataValue =
		type === 'radio' ? { 'data-radio-value': rest.value } : '';
	const dataRadioChecked =
		type === 'radio' ? { 'data-checked': rest.value === field.value } : '';
	return (
		<>
			{type === 'radio' ? (
				<div
					className={`${cnfull}${typeSfx}${stateSfx}${disabledSfx}`}
					{...radioDataValue}
					{...dataRadioChecked}
				>
					<input
						{...field}
						{...rest}
						type={type}
						id={`${id}-${name}`}
						aria-invalid={!!fieldState.error}
						checked={rest.value === field.value}
						onChange={v => {
							field.onChange(v);
							onChangeHandler(name, v);
						}}
						onBlur={field.onBlur}
					/>
				</div>
			) : type === 'checkbox' ? (
				<div className={`${cnfull}${typeSfx}${stateSfx}`} {...dataChecked}>
					<input
						{...field}
						{...rest}
						type={type}
						id={`${id}-${name}`}
						aria-invalid={!!fieldState.error}
					/>
				</div>
			) : (
				<input
					{...field}
					{...rest}
					type={type}
					className={`${cnfull}${typeSfx}${stateSfx}`}
					id={`${id}-${name}`}
					aria-invalid={!!fieldState.error}
					autoComplete={autocomplete}
					{...placeholder}
				/>
			)}
		</>
	);
};

export { Input };
