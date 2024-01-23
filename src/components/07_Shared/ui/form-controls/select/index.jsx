import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Controller, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Select, { components } from 'react-select';

import './_init.scss';

const dataOptsDefault = [
	// { value: 'mock_value-1', label: 'mock_label-1' },
	// { value: 'mock_value-2', label: 'mock_label-2' },
	// { value: 'mock_value-3', label: 'mock_label-3' }
];
const XSelect = ({
	id,
	name,
	control,
	rules,
	isLoading = false,
	isSearchable = false,
	isClearable = false,
	isOpened = false,
	options,
	isMulti = false,
	onChangeHandler = () => {},
	...rest
}) => {
	// const selectPrefix = 'xselect'
	const { t } = useTranslation();
	const { fieldState } = useController({
		name,
		control,
		rules: rules
	});
	const dataOpts = useMemo(() => options ?? dataOptsDefault, [options]);
	const [currentValue, setCurrentValue] = useState('');
	// const getValue = useCallback(() => {
	// 	if (currentValue) {
	// 		return isMulti
	// 			? dataOpts.filter(el => currentValue.indexOf(el.value) >= 0)
	// 			: dataOpts.find(el => el.value === currentValue);
	// 	} else {
	// 		return isMulti ? [] : '';
	// 	}
	// }, [currentValue, dataOpts, isMulti]);

	const handleChange = selectedElement => {
		setCurrentValue(
			isMulti ? selectedElement.map(el => el.value) : selectedElement.value
		);
	};

	const [opened, setOpened] = useState(isOpened);
	const [animationOpened, setAnimationOpened] = useState(isOpened);
	const componentRef = useRef(null);
	//
	const placeholder = rest.placeholder
		? rest.placeholder
		: t(`field.placeholder.${name}`);

	return (
		<Controller
			control={control}
			name={name}
			rules={rules}
			render={({ field, currentItems }) => (
				<>
					<Select
						ref={componentRef}
						{...rest}
						isDisabled={rest.disabled}
						className={`xselect-container${fieldState.error ? ' invalid' : ''}`}
						classNamePrefix='xselect'
						placeholder={placeholder}
						// value={getValue()}
						value={field.value}
						options={dataOpts}
						// onChange={value => {
						// 	field.onChange();
						// 	// handleChange(value);
						// }} // send value to hook form
						onChange={v => {
							handleChange(v);
							field.onChange(v);
							onChangeHandler(v);
						}} // send value to hook form
						// onChange={handleChange} // send value to hook form
						// onChange={getValue()} // send value to hook form
						onBlur={rest.onBlur} // notify when input is touched/blur
						name={field.name} // send down the input name
						// inputId={field.name}
						inputId={`${id}-${field.name}`}
						inputRef={field.ref} // send input ref, so we can focus on input when error appear
						isMulti={isMulti}
						isLoading={isLoading}
						// isSearchable={isSearchable}
						isSearchable={isSearchable}
						isClearable={isClearable}
						components={{
							Menu: props => (
								<components.Menu
									{...props}
									className={animationOpened ? 'opening' : 'closing'}
								/>
							)
						}}
						menuIsOpen={opened}
						onMenuOpen={() => {
							setAnimationOpened(true);
							setOpened(true);
						}}
						onMenuClose={() => {
							setAnimationOpened(false);
							setTimeout(() => {
								setOpened(false);
							}, 150);
						}}
						// closeMenuOnSelect={!isMulti}
					/>
				</>
			)}
		/>
	);
};

export default XSelect;
