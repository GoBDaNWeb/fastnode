import { useTranslation } from 'react-i18next';

import { BoxA } from '@Shared/ui/boxa';
import BoxGrd from '@Shared/ui/layouts/boxgrd';

import useBEM from '@hooks/useBEM';

import './nodevideobox.scss';

const NodeVideoBox = ({ bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'nodevideobox';
	const [cnfull] = useBEM({ cn, bem });
	return (
		<BoxA cls={cnfull}>
			<BoxGrd
				placeA={
					<>
						<iframe
							width='560'
							height='315'
							src='https://www.youtube.com/embed/NYGpLFLFzFI?si=aCeyRNKQBP1fwH0R'
							title='YouTube video player'
							frameBorder='0'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							allowfullscreen
						></iframe>
					</>
				}
			/>
		</BoxA>
	);
};

export default NodeVideoBox;
