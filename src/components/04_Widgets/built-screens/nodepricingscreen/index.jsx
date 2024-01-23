import { useTranslation } from 'react-i18next';

import NodePricingBox from '@Entities/nodepricingbox';

import Screen from '@Shared/screen';
import { Heading } from '@Shared/typography/heading';
import ScreenGrd from '@Shared/ui/layouts/screengrd';

import useBEM from '@hooks/useBEM';

import './nodepricingscreen.scss';

const NodePricingScreen = ({ bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'nodepricingscreen';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<Screen id={'pricing'} cls={cnfull}>
			<ScreenGrd
				placeA={
					<>
						<Heading align={'center'} level='2'>
							{t('pricingnodescreen.heading.body')}
						</Heading>
					</>
				}
				placeB={
					<>
						<div className='rectangle1'></div>
						<div className='rectangle2'></div>
						<NodePricingBox cn={'nodepricingbox bg1'} titleBadge={'Simple Nodes'} price={396} />
						<NodePricingBox cn={'nodepricingbox bg2'} titleBadge={'Archival Nodes'} price={792} />
					</>
				}
			></ScreenGrd>
		</Screen>
	);
};

export default NodePricingScreen;
