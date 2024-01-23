const useCovertToUnits = units => {
	const initialDivider = 16;
	const enumUnits = ['px', 'rem', 'em'];
	const defaultUnits = enumUnits[0];
	const isValidType = enumUnits.some(item => item === units);
	const preparedUnits = isValidType ? units : defaultUnits;

	function go(sourceValue) {
		let result;
		switch (units) {
			case 'rem':
			case 'em':
				result = sourceValue / initialDivider + preparedUnits;
				break;
			default:
				result = sourceValue + preparedUnits;
		}
		return result;
	}

	return go;
};

export default useCovertToUnits;
