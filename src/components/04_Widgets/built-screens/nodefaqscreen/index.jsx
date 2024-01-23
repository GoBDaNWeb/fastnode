import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Screen from '@Shared/screen';
import { Heading } from '@Shared/typography/heading';
import Accordion from '@Shared/ui/accordion';
import ScreenGrd from '@Shared/ui/layouts/screengrd';

import useBEM from '@hooks/useBEM';

import './nodefaqscreen.scss';

const accordions1 = [
	{
		title: 'What services are part of Fastnode.io?',
		content:
			'Fastnode will support web banners, video advertising, advertising on mobile applications, native advertising, as well as the CPA format.'
	},
	{
		title: 'What ad formats will Fastnode support?',
		content:
			'Fastnode will support web banners, video advertising, advertising on mobile applications, native advertising, as well as the CPA format.'
	},
	{
		title: 'What does artificial intelligence do within the framework of the project?',
		content:
			'Fastnode will support web banners, video advertising, advertising on mobile applications, native advertising, as well as the CPA format.'
	}
];
const accordions2 = [
	{
		title: 'What is CPA?',
		content:
			'Fastnode will support web banners, video advertising, advertising on mobile applications, native advertising, as well as the CPA format.'
	},
	{
		title: 'How to connect to Fastnode?',
		content:
			'Fastnode will support web banners, video advertising, advertising on mobile applications, native advertising, as well as the CPA format.'
	},
	{
		title: 'How will payments be made to publishers?',
		content:
			'Fastnode will support web banners, video advertising, advertising on mobile applications, native advertising, as well as the CPA format.'
	},

	{
		title: 'Will there be a mobile version?',
		content:
			'Fastnode will support web banners, video advertising, advertising on mobile applications, native advertising, as well as the CPA format.'
	}
];

const NodeFaqScreen = ({ bem = {} }) => {
	const [selectedAccordion, setSelectedAccordion] = useState(0);

	const { t } = useTranslation();
	const cn = 'nodefaqscreen';
	const [cnfull] = useBEM({ cn, bem });

	return (
		<Screen id={'pricing'} cls={cnfull}>
			<ScreenGrd
				placeA={
					<>
						<div className='rectangle1'></div>

						<Heading align={'center'} level='2'>
							{t('faqnodescreen.heading.body')}
						</Heading>
					</>
				}
				placeB={
					<>
						<div className='acc-col col1'>
							{accordions1.map((acc, index) => (
								<Accordion
									key={acc.title}
									onClick={() => setSelectedAccordion(acc.title)}
									isShow={acc.title === selectedAccordion}
									title={acc.title}
								>
									{acc.content}
								</Accordion>
							))}
						</div>
						<div className='acc-col col2'>
							{accordions2.map((acc, index) => (
								<Accordion
									key={acc.title}
									onClick={() => setSelectedAccordion(index)}
									isShow={index === selectedAccordion}
									title={acc.title}
								>
									{acc.content}
								</Accordion>
							))}
						</div>
					</>
				}
			></ScreenGrd>
		</Screen>
	);
};

export default NodeFaqScreen;
