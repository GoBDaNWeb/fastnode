import { v4 as uuidv4 } from 'uuid';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { A11y, Autoplay, FreeMode, Keyboard, Pagination } from 'swiper/modules';
import 'swiper/scss';
import 'swiper/scss/a11y';
import 'swiper/scss/autoplay';
import 'swiper/scss/free-mode';
import 'swiper/scss/keyboard';
import 'swiper/scss/pagination';

import useBEM from '@hooks/useBEM';

import './init.scss';

const SwiperCmp = ({ id, children, bem = {} }) => {
	const cn = 'swipercmp';
	const [cnfull] = useBEM({ cn, bem });
	const childrenArr = useMemo(
		() => (Array.isArray(children) ? children : [children]),
		[children]
	);

	const swiperElemRef = useRef(null);
	const swiperInstanceRef = useRef(null);

	const [initialNumber, setInitialNumber] = useState(
		Math.ceil(childrenArr.length / 2) - 1
	);
	useEffect(() => {
		setInitialNumber(Math.ceil(childrenArr.length / 2) - 1);
	}, [childrenArr]);

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
						obj.hostEl.classList.add('slider-moved');
					}}
					onTransitionStart={obj => {
						obj.hostEl.classList.add('slider-moved');
					}}
					onTransitionEnd={obj => {
						obj.hostEl.classList.remove('slider-moved');
					}}
					a11y={true}
					// tabIndex={0}
					initialSlide={initialNumber}
					freeMode={true}
					pagination={{
						clickable: true
					}}
					grabCursor={true}
					speed={2000}
					autoplay={{
						delay: 1000,
						disableOnInteraction: false
						// pauseOnMouseEnter: true
					}}
					modules={[A11y, Autoplay, FreeMode, Keyboard, Pagination]}
					keyboard={{
						enabled: true
					}}
					breakpoints={{
						296: {
							initialSlide: 0,
							slidesPerView: 1.5,
							spaceBetween: 16,
							centerInsufficientSlides: true,
							rewind: true
						},
						576: {
							slidesPerView: 2.1,
							spaceBetween: 30,
							centeredSlides: true,
							rewind: true,
							centerInsufficientSlides: true,
							centeredSlidesBounds: true
						},
						768: {
							slidesPerView: 1.72,
							spaceBetween: 30,
							centeredSlides: true,
							rewind: true,
							centerInsufficientSlides: true,
							centeredSlidesBounds: true
						},
						992: {
							slidesPerView: 3.2,
							spaceBetween: 30,
							centeredSlides: true,
							rewind: true,
							centerInsufficientSlides: true,
							centeredSlidesBounds: true
							// loop: true
						},
						1170: {
							slidesPerView: 3.69,
							spaceBetween: 30,
							centeredSlides: true,
							rewind: true,
							centerInsufficientSlides: true,
							centeredSlidesBounds: true
						},
						1600: {
							slidesPerView: 5,
							spaceBetween: 40,
							centeredSlides: true,
							rewind: true,

							centerInsufficientSlides: true,
							centeredSlidesBounds: true
						}
					}}
				>
					<div className='decorator--dark'></div>
					<div className='decorator--light'></div>

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

export default SwiperCmp;
