import NodeBox from '@Entities/nodebox';
import ButtonDialog from '@Shared/built-controls/btnDialog';
import Screen from '@Shared/screen';
import { Heading } from '@Shared/typography/heading';
import ScreenGrd from '@Shared/ui/layouts/screengrd';

import { useTranslation } from 'react-i18next';

import BoxSwiperCmp from '@Features//boxswipercmp';

import useBEM from '@hooks/useBEM';

import './nodescreen.scss';

const NodeScreen = ({ bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'nodescreen';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<Screen id={'nodes'} cls={cnfull} xfull={true}>
			<ScreenGrd
				top={
					<Heading
						level='2'
						align='center'
						badge={t('nodescreen.heading.badge')}
						icon={'📡'}
					>
						{t('nodescreen.heading.body')}
					</Heading>
				}
			>
				<BoxSwiperCmp>
					<NodeBox
						// glow={'nodebox'}
						heading={t('node_1.heading')}
						features={[
							t('node_1.features.item_1'),
							t('node_1.features.item_2'),
							t('node_1.features.item_3'),
							t('node_1.features.item_4')
						]}
						controls={<ButtonDialog name='contact_us' />}
					/>
					<NodeBox
						// glow={'nodebox'}
						heading={t('node_2.heading')}
						features={[
							t('node_2.features.item_1'),
							t('node_2.features.item_2'),
							t('node_2.features.item_3'),
							t('node_2.features.item_4')
						]}
						controls={<ButtonDialog name='contact_us' />}
					/>
					<NodeBox
						// glow={'nodebox'}
						heading={t('node_3.heading')}
						features={[
							t('node_3.features.item_1'),
							t('node_3.features.item_2'),
							t('node_3.features.item_3'),
							t('node_3.features.item_4')
						]}
						controls={<ButtonDialog name='contact_us' />}
					/>
				</BoxSwiperCmp>
			</ScreenGrd>
		</Screen>
	);
};

export default NodeScreen;
