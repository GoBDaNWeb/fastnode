import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';

import Breadcrumbs from '@Widgets/navigation/breadcrumbs';

import FullNodeBox from '@Entities/fullnodebox';

import Screen from '@Shared/screen';
import { Description } from '@Shared/typography/description';
import { Heading } from '@Shared/typography/heading';
import ScreenGrd from '@Shared/ui/layouts/screengrd';

import useBEM from '@hooks/useBEM';

import './fullnodeheroscreen.scss';

const FullNodeHeroScreen = ({ currentNode, bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'fullnodeheroscreen';
	const [cnfull] = useBEM({ cn, bem });
	return (
		<Screen id={'hero'} cls={cnfull}>
			<ScreenGrd
				top={
					<>
						<Breadcrumbs />
					</>
				}
				placeA={
					<>
						<Heading level='1' align='center' badge={t('nodescreen.heading.badge')}>
							{currentNode?.name} {t('nodescreen.heading.body')}
						</Heading>
						<Description>
							<p>{t('nodescreen.content.description')}</p>
						</Description>
					</>
				}
				placeB={
					<>
						<div className='rectangle1'></div>
						<div className='rectangle2'></div>
						<FullNodeBox currentNode={currentNode} />
					</>
				}
			></ScreenGrd>
		</Screen>
	);
};

export default FullNodeHeroScreen;
