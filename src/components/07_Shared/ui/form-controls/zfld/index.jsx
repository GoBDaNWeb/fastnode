import { Fld } from '@Shared/ui/form-controls/fld';
import { Input } from '@Shared/ui/form-controls/input';
import XSelect from '@Shared/ui/form-controls/select';
import { Textarea } from '@Shared/ui/form-controls/textarea';

import { useId } from 'react';

function DisplayTag({
	id,
	tag,
	type,
	name,
	control,
	locale,
	rules,
	onChangeHandler,
	...rest
}) {
	let result = '';
	switch (tag) {
		case 'select':
			result = (
				<XSelect
					id={id}
					name={name}
					control={control}
					rules={rules}
					{...rest}
					type={type}
					onChangeHandler={onChangeHandler}
				/>
			);
			break;
		case 'textarea':
			result = (
				<Textarea
					id={id}
					name={name}
					control={control}
					rules={rules}
					{...rest}
				/>
			);
			break;
		default:
			result = (
				<Input
					id={id}
					name={name}
					control={control}
					rules={rules}
					// locale={locale}
					{...rest}
					type={type}
					onChangeHandler={onChangeHandler}
				/>
			);
	}
	return result;
}

const ZFld = ({
	tag,
	type,
	name,
	control,
	rules,
	label,
	locale = {},
	assist,
	grid,
	onChangeHandler,
	bem = {},
	...rest
}) => {
	const uid = useId();
	return (
		<Fld
			id={uid}
			tag={tag}
			name={name}
			control={control}
			type={type}
			grid={grid}
			rules={{ ...rules }}
			label={label}
			assist={assist}
			locale={locale}
			{...rest}
		>
			<DisplayTag
				id={uid}
				tag={tag}
				control={control}
				rules={rules}
				locale={locale}
				{...rest}
				name={name}
				type={type}
				onChangeHandler={onChangeHandler}
			/>
		</Fld>
	);
};

export { ZFld };
