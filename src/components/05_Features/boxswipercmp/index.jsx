import { v4 as uuidv4 } from 'uuid';

import { useEffect, useMemo, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { A11y, Autoplay, FreeMode, Keyboard, Pagination } from 'swiper/modules';

import 'swiper/scss';
import 'swiper/scss/a11y';
import 'swiper/scss/autoplay';
import 'swiper/scss/free-mode';
import 'swiper/scss/keyboard';
import 'swiper/scss/pagination';

import useBEM from '@hooks/useBEM';

import './_init.scss';

const BoxSwiperCmp = ({
	children,
	params = { initialSlide: 0, spaceBetween: 200, rewind: true, loop: false },
	bem = {}
}) => {
	const cn = 'boxswipercmp';
	const [cnfull] = useBEM({ cn, bem });
	const childrenArr = useMemo(
		() => (Array.isArray(children) ? children : [children]),
		[children]
	);

	const swiperElemRef = useRef(null);
	const swiperInstanceRef = useRef(null);

	useEffect(() => {
		let isSwiperVisible = false;
		const handleVisibility = () => {
			const containerRect = swiperElemRef.current.getBoundingClientRect();
			const isVisible =
				containerRect.top < window.innerHeight && containerRect.bottom > 0;
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
	const _autoPlay = params.autoPlay ?? {
		delay: 3000,
		disableOnInteraction: false
	};

	return (
		<div
			className={`${cnfull}`}
			onMouseEnter={() => {
				swiperInstanceRef.current.autoplay.stop();
			}}
			onMouseLeave={() => {
				swiperInstanceRef.current.autoplay.start();
			}}
		>
			<>
				<Swiper
					ref={swiperElemRef}
					onSwiper={swiper => (swiperInstanceRef.current = swiper)}
					onSliderMove={obj => {
						obj.hostEl.closest('.boxswipercmp').classList.add('slider-moved');
					}}
					onTransitionStart={obj => {
						obj.hostEl.closest('.boxswipercmp').classList.add('slider-moved');
					}}
					onTransitionEnd={obj => {
						obj.hostEl
							.closest('.boxswipercmp')
							.classList.remove('slider-moved');
					}}
					a11y={{
						enabled: true
					}}
					initialSlide={params.initialSlide}
					slidesPerView={1}
					spaceBetween={params.spaceBetween}
					pagination={{
						clickable: true
					}}
					grabCursor={params.grabCursor ?? true}
					speed={2000}
					autoplay={_autoPlay}
					modules={[A11y, Autoplay, FreeMode, Keyboard, Pagination]}
					keyboard={{
						enabled: true
					}}
					rewind={params.rewind}
					loop={params.loop}
				>
					{childrenArr.map((item, index) => {
						return (
							<SwiperSlide key={uuidv4()}>
								<div className={`${cn}__slide-helper`}>{item}</div>
							</SwiperSlide>
						);
					})}
				</Swiper>
			</>
		</div>
	);
};

export default BoxSwiperCmp;
