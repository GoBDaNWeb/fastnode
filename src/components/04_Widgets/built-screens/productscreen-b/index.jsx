import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Autoplay, Controller, EffectFade } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/autoplay';
import 'swiper/scss/effect-fade';

import Screen from '@Shared/screen';
import { Description } from '@Shared/typography/description';
import { Heading } from '@Shared/typography/heading';
import Button from '@Shared/ui/button';
import { CtrlsGrd } from '@Shared/ui/layouts/ctrlsgrd';
import ScreenGrd from '@Shared/ui/layouts/screengrd';
import PictureSet from '@Shared/ui/pictureset';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const ProductScreenB = ({ bem = {} }) => {
	const { t } = useTranslation();
	const cn = 'productscreen-b';
	const [cnfull] = useBEM({ cn, bem });

	const params = useMemo(
		() => ({
			effect: 'fade',
			modules: [EffectFade, Autoplay, Controller],
			speed: 1000,
			rewind: true,
			autoplay: {
				delay: 3000,
				disableOnInteraction: false
			},
			preventInteractionOnTransition: false,
			autoHeight: true,

			onClick: el => el.slideNext(),
			onSwiper: swiper => (swiperInstanceRef.current = swiper)
		}),
		[]
	);

	const swiperElemRef = useRef(null);
	const swiperInstanceRef = useRef(null);

	useEffect(() => {
		let isSwiperVisible = false;
		const handleVisibility = () => {
			const containerRect = swiperElemRef.current.getBoundingClientRect();
			const isVisible = containerRect.top < window.innerHeight && containerRect.bottom > 0;
			if (swiperInstanceRef.current.autoplay) {
				if (isVisible && !isSwiperVisible) {
					swiperInstanceRef.current.autoplay.start();
					isSwiperVisible = true;
				} else if (!isVisible && isSwiperVisible) {
					swiperInstanceRef.current.autoplay.stop();
					isSwiperVisible = false;
				}
			}
		};
		handleVisibility();
		window.addEventListener('scroll', handleVisibility);

		return () => {
			window.removeEventListener('scroll', handleVisibility);
			swiperInstanceRef.current.destroy();
		};
	}, []);

	return (
		<Screen id={'products'} cls={cnfull}>
			<ScreenGrd
				glow={'product'}
				glowPlace='a'
				top={
					<Heading level='2' align='center' badge={t('productscreen.heading.badge')} icon={'🛠️'}>
						{t('productscreen.heading.body')}
					</Heading>
				}
				placeA={
					<PictureSet
						dimension={[
							{
								bp: 'sm',
								src: `products/dedicated_nodes/product-sm`
							},
							{
								bp: 'xl',
								src: `products/dedicated_nodes/product-xl`
							}
						]}
						retinaSrc={`products/dedicated_nodes/product@2x`}
						types={['avif', 'webp', 'jpg']}
						alt={'dedicated nodes image'}
						width={624}
						height={416}
					/>
				}
				placeB={
					<div
						className={`${cn}__info`}
						onMouseEnter={() => {
							swiperInstanceRef.current.autoplay.stop();
						}}
						onMouseLeave={() => {
							swiperInstanceRef.current.autoplay.start();
						}}
					>
						<Swiper ref={swiperElemRef} className={'rotator'} {...params}>
							<SwiperSlide>
								<div className={`product-info`}>
									<Heading level='3'>{t('product_1.heading.body')}</Heading>
									<Description>
										<p>{t('product_1.content.description')}</p>
									</Description>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className={`product-info`}>
									<Heading level='3'>{t('product_2.heading.body')}</Heading>
									<Description>
										<p>{t('product_2.content.description')}</p>
									</Description>
								</div>
							</SwiperSlide>
							<SwiperSlide>
								<div className={`product-info`}>
									<Heading level='3'>{t('product_3.heading.body')}</Heading>
									<Description>
										<p>{t('product_3.content.description')}</p>
									</Description>
								</div>
							</SwiperSlide>
						</Swiper>
						<CtrlsGrd>
							<Button name='start_today' to={'signup'} />
						</CtrlsGrd>
					</div>
				}
			></ScreenGrd>
		</Screen>
	);
};

export default ProductScreenB;
