import { useTranslation } from 'react-i18next';

import { v4 as uuidv4 } from 'uuid';

import SwiperCmp from '@Features//swipercmp';

import PartnerBox from '@Entities/partnerbox';

import Screen from '@Shared/screen';
import { Heading } from '@Shared/typography/heading';
import ScreenGrd from '@Shared/ui/layouts/screengrd';

import partners from '@data/partners';

import useBEM from '@hooks/useBEM';

import './partnernodescreen.scss';

const PartnerNodeScreen = ({ id, children, bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'partnernodescreen';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<Screen id={'partners'} cls={cn} xfull={true} glow={'partners'}>
			<ScreenGrd
				top={
					<Heading level='2' align='center'>
						{t('partnernodescreen.heading.body')}
					</Heading>
				}
			>
				<SwiperCmp>
					{partners.map(item => {
						if (item.symbolId) {
							return <PartnerBox key={uuidv4()} to={item.to} symbolId={item.symbolId} />;
						} else if (item.imageName) {
							return <PartnerBox key={uuidv4()} to={item.to} imageName={item.imageName} />;
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

export default PartnerNodeScreen;
