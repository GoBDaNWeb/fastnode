import { useTranslation } from 'react-i18next';

import Screen from '@Shared/screen';
import { Description } from '@Shared/typography/description';
import { Heading } from '@Shared/typography/heading';
import Button from '@Shared/ui/button';
import Decorator from '@Shared/ui/decorator';
import ScreenGrd from '@Shared/ui/layouts/screengrd';

import useBEM from '@hooks/useBEM';

import './_init.scss';

// const Decorator = lazy(() => import('@Shared/ui/decorator'));

const IntroScreen = ({ bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'introscreen';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<Screen cls={cnfull} overlay={1}>
			<ScreenGrd
				placeA={
					<>
						<Heading level='1' badge={t('introscreen.heading.badge')} icon={'⚙️'}>
							{t('introscreen.heading.body')}
						</Heading>
						<Description>
							<p>{t('introscreen.content.description')}</p>
						</Description>
						{/* <ButtonDialog name='get_started' /> */}
						<Button type='link' to='signup' name='get_started' face='base' accent='primary' />
					</>
				}
				placeB={<Decorator type={'hexagon'} variant={'intro'} />}
			/>
		</Screen>
	);
};

export default IntroScreen;
