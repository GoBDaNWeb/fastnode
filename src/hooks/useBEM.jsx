import { useCallback, useEffect, useState } from 'react';

function useBEM({ cn, bem }) {
	const generatePrefix = useCallback(
		() => (bem?.prefix ? ` ${bem?.prefix}__${cn}` : ''),
		[cn, bem]
	);
	const generateSuffix = useCallback(
		() => (bem?.suffix ? ` ${cn}--${bem?.suffix}` : ''),
		[cn, bem]
	);
	const [prefix, setPrefix] = useState(generatePrefix());
	const [suffix, setSuffix] = useState(generateSuffix());
	const [full, setFull] = useState(
		`${cn}${generatePrefix()}${generateSuffix()}`
	);

	useEffect(() => {
		setPrefix(generatePrefix());
		setSuffix(generateSuffix());
		setFull(`${cn}${generatePrefix()}${generateSuffix()}`);
	}, [cn, bem, generatePrefix, generateSuffix]);

	return [full, prefix, suffix];
}
export default useBEM;
