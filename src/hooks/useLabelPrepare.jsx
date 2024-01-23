import { useEffect, useMemo, useState } from 'react';

import merge from 'lodash/merge';

function useLabelPrepare(label, labelDefault) {
	const _labelDefault = useMemo(() => {
		const _default = {
			enabled: true,
			caption: true,
			description: false
		};
		if (labelDefault && typeof labelDefault === 'object') {
			return merge(_default, labelDefault);
		} else {
			return { ..._default };
		}
	}, [labelDefault]);

	const [labelReceived, setLabelReceived] = useState(
		label && typeof label === 'object'
			? label
			: label === false
			? merge(_labelDefault, { enabled: false })
			: _labelDefault
	);
	const [labelObj, setLabelObj] = useState(merge(_labelDefault, labelReceived));
	useEffect(() => {
		if (label && typeof label === 'object') {
			setLabelReceived(label);
		} else if (label === false) {
			setLabelReceived(merge(_labelDefault, { enabled: false }));
		} else {
			setLabelReceived(_labelDefault);
		}
	}, [label, _labelDefault]);

	useEffect(() => {
		if (typeof labelReceived === 'object' || labelReceived == true) {
			setLabelObj(merge(_labelDefault, { enabled: true }));
		} else {
			setLabelObj(merge(_labelDefault, { enabled: false }));
		}
	}, [_labelDefault, labelReceived]);

	useEffect(() => {
		if (typeof labelReceived === 'object') {
			setLabelObj(merge(_labelDefault, labelReceived));
		} else if (typeof labelReceived === 'string') {
			setLabelObj(merge(_labelDefault, { caption: labelReceived }));
		} else {
			setLabelObj(_labelDefault);
		}
	}, [_labelDefault, labelObj, labelReceived]);

	return [labelObj];
}
export default useLabelPrepare;
