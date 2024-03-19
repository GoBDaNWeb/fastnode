import { useTranslation } from 'react-i18next';

import FBForm from '@Widgets/built-forms/fbform';

import Screen from '@Shared/screen';
import { Description } from '@Shared/typography/description';
import { Heading } from '@Shared/typography/heading';
import ScreenGrd from '@Shared/ui/layouts/screengrd';

import useBEM from '@hooks/useBEM';

import './fbscreen.scss';

const FBScreen = ({ bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'fbscreen';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<Screen id={'contact'} cls={cn} frame='attract'>
			<ScreenGrd
				placeA={
					<>
						<Heading level='3' variant='attract' badge={t('fbscreen.heading.badge')}>
							{t('fbscreen.heading.body')}
						</Heading>
						<Description variant='attract'>
							<p>{t('fbscreen.content.description')}</p>
						</Description>
					</>
				}
				placeB={<FBForm />}
			/>
		</Screen>
	);
};

export default FBScreen;
