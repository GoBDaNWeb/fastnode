import useBEM from '@hooks/useBEM';
import useGetLocale from '@hooks/useGetLocale';

import './_init.scss';

const Label = ({
	id,
	name,
	type,
	caption,
	description,
	locale = {},
	bem = {}
}) => {
	const cn = 'label';
	const [cnfull] = useBEM({ cn, bem });
	const [$caption] = useGetLocale([
		locale?.name ?? name,
		'field.label.caption',
		locale
	]);
	const captionText =
		caption &&
		(typeof caption === 'string' ? caption : $caption ? $caption : '');
	const [$description] = useGetLocale([
		locale?.name ?? name,
		'field.label.description',
		locale
	]);
	const descriptionText =
		description &&
		(typeof description === 'string'
			? description
			: locale?.description
			? $description
			: '');

	const descriptionResult = locale?.description ? $description : '';

	const typeSfx = type ? ` ${cn}--${type}` : '';

	return (
		<label className={`${cnfull}${typeSfx}`} htmlFor={`${id}-${name}`}>
			<span className={`${cn}__caption`}>
				<span>{captionText}</span>
			</span>
			{description && (
				<span className={`${cn}__description`}>
					<span>{descriptionText}</span>
				</span>
			)}
			{locale?.description && (
				<span className={`${cn}__description`}>
					<span>{descriptionResult}</span>
				</span>
			)}
		</label>
	);
};

export { Label };
