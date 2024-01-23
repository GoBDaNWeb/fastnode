import { useCallback, useEffect, useState } from 'react';

function useFldSfx({ cn, fieldState, rules }) {
	const getInvalid = useCallback(
		() => (fieldState?.invalid ? ` ${cn}--${'invalid'}` : ''),
		[cn, fieldState]
	);
	const getValid = useCallback(
		() => (!fieldState?.invalid ? ` ${cn}--${'valid'}` : ''),
		[cn, fieldState]
	);
	const getDirty = useCallback(
		() => (fieldState?.isDirty ? ` ${cn}--${'dirty'}` : ''),
		[cn, fieldState]
	);
	const getTouched = useCallback(
		() => (fieldState?.isTouched ? ` ${cn}--${'touched'}` : ''),
		[cn, fieldState]
	);
	const getRequired = useCallback(
		() => (rules?.required ? ` ${cn}--${'required'}` : ''),
		[cn, rules]
	);
	const [invalid, setInvalid] = useState(getInvalid());
	const [valid, setValid] = useState(getValid());
	const [dirty, setDirty] = useState(getDirty());
	const [touched, setTouched] = useState(getTouched());
	const [required, setRequired] = useState(getRequired());
	const [full, setFull] = useState(
		`${getInvalid()}${getValid()}${getDirty()}${getTouched()}${getRequired()}`
	);
	useEffect(() => {
		setInvalid(getInvalid());
		setValid(getValid());
		setDirty(getDirty());
		setTouched(getTouched());
		setRequired(getRequired());
	}, [
		cn,
		fieldState,
		rules,
		getInvalid,
		getValid,
		getDirty,
		getTouched,
		getRequired
	]);

	useEffect(() => {
		setFull(`${invalid}${valid}${dirty}${touched}${required}`);
	}, [invalid, valid, dirty, touched, required]);

	return [full];
}
export default useFldSfx;
