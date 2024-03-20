import { v4 as uuidv4 } from 'uuid';

import useBEM from '@hooks/useBEM';
import useCovertToUnits from '@hooks/useCovertToUnits';

import './_init.scss';

const PictureSet = ({ dimension = {}, retinaSrc, types = [], width, height, alt, bem = {} }) => {
	const cn = 'pictureset';
	const [cnfull] = useBEM({ cn, bem });
	const urlBase = '/images/';
	const dim = dimension ? dimension : [];

	const enumTypesOrder = {
		avif: 1,
		webp: 2,
		jpg: 3
	};
	const bp = { sm: 576, xl: 1170 };
	const bpMax = { sm: bp.sm - 1, xl: bp.xl - 1 };
	const greatestBpValue = Object.values(bp).sort((a, b) => b - a)[0];
	const greatestBp = Object.entries(bp).find(item => item[1] === greatestBpValue)[0];
	const greatestImageSrc = dimension.find(item => item.bp === greatestBp).src;
	const lowestTypeOrderValue = Object.values(enumTypesOrder).sort((a, b) => b - a)[0];
	let lowestTypeOrderKey = Object.entries(enumTypesOrder).find(
		item => item[1] === lowestTypeOrderValue
	)[0];

	const convert = useCovertToUnits('rem');

	return (
		<picture className={cnfull}>
			{types.map(type => {
				return dim.map((item, index) => {
					return (
						<source
							key={uuidv4()}
							srcSet={`${urlBase + retinaSrc + '.' + type} 2x, ${
								urlBase + item.src + '.' + type
							} 1x`}
							media={`(max-width: ${convert(bpMax[item.bp])})`}
							type={`image/${type}`}
						/>
					);
				});
			})}
			{types.map(type => {
				return (
					<source
						key={uuidv4()}
						srcSet={`${urlBase + retinaSrc + '.' + type} 2x, ${
							urlBase + greatestImageSrc + '.' + type
						} 1x`}
						media={`(min-width: ${convert(greatestBpValue)})`}
						type={`image/${type}`}
					/>
				);
			})}
			<img
				srcSet={`${urlBase + retinaSrc + '.' + lowestTypeOrderKey} 2x, ${
					urlBase + greatestImageSrc + '.' + lowestTypeOrderKey
				} 1x`}
				width={width}
				height={height}
				alt={alt}
			/>
		</picture>
	);
};

export default PictureSet;
