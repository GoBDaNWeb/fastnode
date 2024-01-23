import { Label } from '@Shared/ui/form-controls/label/';
import { Notify } from '@Shared/ui/form-controls/notify';
import { FldGrd } from '@Shared/ui/layouts/field';

import { useController } from 'react-hook-form';

import useBEM from '@hooks/useBEM';
import useFldSfx from '@hooks/useFldSfx';
import usePrepareControlData from '@hooks/usePrepareControlData';

import './_init.scss';

const Fld = ({
	id,
	children,
	name,
	control,
	rules,
	label = true,
	assist,
	tag,
	type,
	variant,
	locale = {},
	bem = {},
	...rest
}) => {
	const { field, fieldState } = useController({
		name,
		control,
		rules: rules
	});
	const cn = 'fld';
	const [cnfull] = useBEM({ cn, bem });
	const [stateSfx] = useFldSfx({ cn, fieldState, rules });

	const tagSfx = tag ? ` ${cn}--${tag}` : '';
	const typeSfx = type ? ` ${cn}--${type}` : '';
	const disabledSfx = rest.disabled ? ` ${cn}--disabled` : '';
	const dataCheckedParams =
		type === 'checkbox' ? { 'data-checked': field.value } : '';

	const [_label] = usePrepareControlData({ data: label });

	const radioDataValue =
		type === 'radio' ? { 'data-radio-value': rest.value } : '';
	const dataRadioChecked =
		type === 'radio' ? { 'data-checked': rest.value === field.value } : '';

	return (
		<div
			className={`${cnfull}${tagSfx}${typeSfx}${stateSfx}${disabledSfx}`}
			{...dataCheckedParams}
			{...radioDataValue}
			{...dataRadioChecked}
		>
			<FldGrd
				tag={tag}
				type={type}
				variant={variant}
				label={
					_label.enabled && (
						<Label
							id={id}
							name={name}
							type={type}
							caption={_label?.caption}
							description={_label?.description}
							locale={{ ...locale }}
							bem={{ prefix: cn }}
						/>
					)
				}
				notify={<Notify name={name} control={control} bem={{ prefix: cn }} />}
				assist={assist}
			>
				{children}
			</FldGrd>
		</div>
	);
};

export { Fld };
