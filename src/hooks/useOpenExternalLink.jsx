import { useCallback } from 'react';

export const useOpenExternalLink = () => {
	const openExternalLink = useCallback(url => {
		window.open(url, '_blank', 'noopener,noreferrer');
	}, []);
	return openExternalLink;
};
