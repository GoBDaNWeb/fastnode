import { useTranslation } from 'react-i18next';

import Breadcrumbs from '@Widgets/navigation/breadcrumbs';

import NodeVideoBox from '@Entities/nodevideobox';

import Screen from '@Shared/screen';
import { Description } from '@Shared/typography/description';
import { Heading } from '@Shared/typography/heading';
import ScreenGrd from '@Shared/ui/layouts/screengrd';

import useBEM from '@hooks/useBEM';

import './nodevideoscreen.scss';

const NodeVideoScreen = ({ bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'nodevideoscreen';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<Screen id={'video'} cls={cnfull}>
			<ScreenGrd
				top={
					<>
						<Heading level='1' align='center'>
							{t('nodevideoscreen.heading.body')}
						</Heading>
						<Description>
							<p>{t('nodevideoscreen.content.description')}</p>
						</Description>
					</>
				}
				placeA={
					<>
						<div className='rectangle1'></div>
						<div className='rectangle2'></div>
						<NodeVideoBox />
					</>
				}
			></ScreenGrd>
		</Screen>
	);
};

export default NodeVideoScreen;
