import { useTranslation } from 'react-i18next';

import Breadcrumbs from '@Widgets/navigation/breadcrumbs';

import NodesHeroBox from '@Entities/nodesherobox';

import Screen from '@Shared/screen';
import { Heading } from '@Shared/typography/heading';
import ScreenGrd from '@Shared/ui/layouts/screengrd';

import useBEM from '@hooks/useBEM';

import './heronodesscreen.scss';

const badges = [
	{
		type: 'fill',
		title: 'LOADBALANCING',
		color: 'green'
	},
	{
		type: 'fill',
		title: 'DEDICATED CLUSTER',
		color: 'blue'
	},
	{
		type: 'fill',
		title: 'CUSTOM NODES',
		color: 'sky'
	}
];

const HeroNodesScreen = ({ bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'heronodesscreen';
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
					<Heading level='1' align='left' icon={'📃'}>
						{t('heronodescreen.heading.body')}
					</Heading>
				}
				placeB={
					<>
						<NodesHeroBox
							heading={t('heronodes.heading')}
							icon={'💻'}
							heading2={t('heronodes.heading2')}
							icon2={'💵'}
							badges={badges}
						/>
					</>
				}
			></ScreenGrd>
		</Screen>
	);
};

export default HeroNodesScreen;
