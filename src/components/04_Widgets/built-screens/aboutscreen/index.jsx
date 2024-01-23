import SteppedCmp from '@Features//steppedcmp';
import ButtonDialog from '@Shared/built-controls/btnDialog';
import Screen from '@Shared/screen';
import { Description } from '@Shared/typography/description';
import { Heading } from '@Shared/typography/heading';
import { CtrlsGrd } from '@Shared/ui/layouts/ctrlsgrd';
import ScreenGrd from '@Shared/ui/layouts/screengrd';

import { useTranslation } from 'react-i18next';

import useBEM from '@hooks/useBEM';

import './aboutscreen.scss';

const AboutScreen = ({ bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'aboutscreen';
	const [cnfull] = useBEM({ cn, bem });

	const _data = [
		{
			id: 1
		},
		{
			id: 2
		},
		{
			id: 3
		}
	];

	return (
		<Screen id={'about'} cls={cnfull} glow={'about'}>
			<ScreenGrd
				placeA={
					<Heading level='2' badge={t('aboutscreen.heading.badge')} icon={'💡'}>
						{t('aboutscreen.heading.body')}
					</Heading>
				}
				placeB={<SteppedCmp markered={true} data={_data} stepKey={'about'} />}
				placeC={
					<Description>
						<p>{t('aboutscreen.content.description')}</p>
					</Description>
				}
				placeD={
					<CtrlsGrd>
						<ButtonDialog name='lets_talk' />
						{/* <Button name='lets_talk' to={'signup'} /> */}
					</CtrlsGrd>
				}
			></ScreenGrd>
		</Screen>
	);
};

export default AboutScreen;
