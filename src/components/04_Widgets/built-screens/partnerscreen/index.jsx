import PartnerBox from '@Entities/partnerbox';
import Screen from '@Shared/screen';
import { Heading } from '@Shared/typography/heading';
import ScreenGrd from '@Shared/ui/layouts/screengrd';

import { useTranslation } from 'react-i18next';

import SwiperCmp from '@Features//swipercmp';

import useBEM from '@hooks/useBEM';

import './partnerscreen.scss';

import partners from '@data/partners';
import { v4 as uuidv4 } from 'uuid';

const PartnerScreen = ({ id, children, bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'partnerscreen';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<Screen id={'partners'} cls={cn} xfull={true} glow={'partners'}>
			<ScreenGrd
				top={
					<Heading
						level='2'
						align='center'
						badge={t('partnerscreen.heading.badge')}
						icon={'⚡️'}
					>
						{t('partnerscreen.heading.body')}
					</Heading>
				}
			>
				<SwiperCmp>
					{partners.map(item => {
						if (item.symbolId) {
							return (
								<PartnerBox
									key={uuidv4()}
									to={item.to}
									symbolId={item.symbolId}
								/>
							);
						} else if (item.imageName) {
							return (
								<PartnerBox
									key={uuidv4()}
									to={item.to}
									imageName={item.imageName}
								/>
							);
						}
					})}
					{/* <PartnerBox name={'covalent'} />
					<PartnerBox name={'solana'} />
					<PartnerBox name={'gnosischain'} />
					<PartnerBox name={'flux'} />
					<PartnerBox name={'polygon'} /> */}
				</SwiperCmp>
			</ScreenGrd>
		</Screen>
	);
};

export default PartnerScreen;
