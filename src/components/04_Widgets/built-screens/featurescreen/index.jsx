import SteppedCmp from '@Features//steppedcmp';
import Screen from '@Shared/screen';
import { Description } from '@Shared/typography/description';
import { Heading } from '@Shared/typography/heading';
import ScreenGrd from '@Shared/ui/layouts/screengrd';

import { useTranslation } from 'react-i18next';

import useBEM from '@hooks/useBEM';

import './featurescreen.scss';

const FeatureScreen = ({ bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'featurescreen';
	const [cnfull] = useBEM({ cn, bem });

	const _data = [
		{
			id: 1,
			icon: 'time'
		},
		{
			id: 2,
			icon: 'configurator'
		},
		{
			id: 3,
			icon: 'stack'
		}
	];

	return (
		<Screen cls={cnfull} glow={'features'}>
			<ScreenGrd
				placeA={
					<Heading
						level='2'
						badge={t('featurescreen.heading.badge')}
						// icon={'📊'}
						// icon={'🧩'}
						// icon={'🗄️'}
						// icon={'📈'}
						icon={'🎛️'}
					>
						{t('featurescreen.heading.body')}
					</Heading>
				}
				placeB={
					<SteppedCmp
						glow='stepped-b'
						markered={false}
						data={_data}
						stepKey={'feature'}
						sign={'icon'}
						iconed={true}
					/>
				}
				placeC={
					<Description>
						<p>{t('featurescreen.content.description')}</p>
					</Description>
				}
			></ScreenGrd>
		</Screen>
	);
};

export default FeatureScreen;
