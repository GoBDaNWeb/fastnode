import { useSelector } from 'react-redux';

export const useStoredSettings = (reducer_name, keys = []) => {
	const saved = {};
	saved[keys[0]] = useSelector(
		state => state[reducer_name]?.savedSettings[keys[0]]
	);
	saved[keys[1]] = useSelector(
		state => state[reducer_name]?.savedSettings[keys[1]]
	);

	saved[keys[2]] = useSelector(
		state => state[reducer_name]?.savedSettings[keys[2]]
	);

	saved[keys[3]] = useSelector(
		state => state[reducer_name]?.savedSettings[keys[3]]
	);
	saved[keys[4]] = useSelector(
		state => state[reducer_name]?.savedSettings[keys[4]]
	);
	saved[keys[5]] = useSelector(
		state => state[reducer_name]?.savedSettings[keys[5]]
	);
	const current = '';

	return [saved, current];
};
