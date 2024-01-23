import { useEffect, useMemo, useState } from 'react';

import merge from 'lodash/merge';

function usePrepareControlData({ data, dataDefault }) {
	const _dataDefault = useMemo(() => {
		const _default = {
			enabled: true,
			caption: true,
			description: false
		};
		if (dataDefault && typeof dataDefault === 'object') {
			return merge(_default, dataDefault);
		} else {
			return _default;
		}
	}, [dataDefault]);

	// Формируем принятые данные на основе имеющегося объекта _dataDefault
	const [dataReceived, setDataReceived] = useState(
		data && typeof data === 'object' // Если передан object
			? data
			: data === false // Если передан false
			? merge(_dataDefault, { enabled: false })
			: typeof data === 'string' // Если передана строка
			? merge(_dataDefault, { caption: data })
			: _dataDefault // Во всех остальных случаях назначаем объект по-умолчанию
	);
	// Формируем принятые данные на основе имеющегося объекта _dataDefault : конец
	// Формируем результирующий объект : начало
	const [resultObj, setResultObj] = useState(merge(_dataDefault, dataReceived));
	useEffect(() => {
		if (data && typeof data === 'object') {
			setDataReceived(data);
		} else if (data === false) {
			setDataReceived(merge(_dataDefault, { enabled: false }));
		} else {
			setDataReceived(_dataDefault);
		}
	}, [data, _dataDefault]);

	useEffect(() => {
		if (typeof dataReceived === 'object' || dataReceived == true) {
			setResultObj(merge(_dataDefault, { enabled: true }));
		} else {
			setResultObj(merge(_dataDefault, { enabled: false }));
		}
	}, [_dataDefault, dataReceived]);

	useEffect(() => {
		if (typeof dataReceived === 'object') {
			setResultObj(merge(_dataDefault, dataReceived));
		} else if (typeof dataReceived === 'string') {
			setResultObj(merge(_dataDefault, { caption: dataReceived }));
		} else {
			setResultObj(_dataDefault);
		}
	}, [_dataDefault, resultObj, dataReceived]);
	// Формируем результирующий объект : конец

	return [resultObj];
}
export default usePrepareControlData;
