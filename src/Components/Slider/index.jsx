import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwiperCore, { Pagination, Autoplay } from 'swiper';
import { KafkaTimeSpentOnSlide, KafkaHeldSlide } from 'src/utils/kafka/KafkaEvents';

// Import Swiper styles
import 'swiper/swiper.less';
import 'swiper/components/pagination/pagination.less';
import { Swiper, SwiperSlide } from 'swiper/react';
import './Slider.less';
// import { Header, Icon } from 'semantic-ui-react';

import { Header, Icon } from 'semantic-ui-react';

SwiperCore.use([Pagination]);

SwiperCore.use([Autoplay]);

const customBulletPagination = (swiper, current, total, autoplay) => {
	const bullet = (index) =>
		`<span ${total === 1 ? 'style="background-color: #ffffff"' : ''} class="slider-bullet  ${
			index === current ? 'current' : ''
		}${index < current ? 'prev' : ''} ${!autoplay ? 'static' : ''}"></span>`;
	let paginationHtml = '';

	for (let i = 1; i <= total; i += 1) {
		paginationHtml += bullet(i, current);
	}
	return paginationHtml;
};

const Slider = ({
	id,
	className,
	slidersPerView,
	slidesPerColumn,
	slidesPerGroup,
	slidesOffsetBefore,
	pagination,
	autoplay,
	autoplayDelay,
	onInit,
	timeOnSliderEvent,
	timeToReachEndOfSlider,
	children,
}) => {
	const [t0InitSlider, setT0InitSlider] = useState(0);
	const [t0SliderTouch, setT0SliderTouch] = useState(0);
	const [swiperElement, setSwiper] = useState();

	const handleInitSlide = (swiper) => {
		setT0InitSlider(performance.now());
		onInit();
		setSwiper(swiper);
	};

	const handleTouch = (swiper, event) => {
		if (event.type === 'touchstart') {
			setT0SliderTouch(performance.now());
			const heldSlide = new KafkaHeldSlide(
				'123456',
				id,
				swiper.slides[swiper.activeIndex].firstElementChild.id
			);
			heldSlide.emitEvent();

			if (pagination) {
				document
					.querySelector(`#${id} .swiper-pagination .slider-bullet.current`)
					.classList.add('reset-progress');
			}
			if (autoplay) {
				swiper?.autoplay?.stop();
			}
		}
		if (event.type === 'touchend') {
			timeOnSliderEvent({
				time: performance.now() - t0SliderTouch,
				sliderIndex: swiper.activeIndex,
			});
			const timeSpentOnSlide = new KafkaTimeSpentOnSlide(
				'123456',
				performance.now() - t0SliderTouch,
				id,
				swiper.slides[swiper.activeIndex].firstElementChild.id
			);
			timeSpentOnSlide.emitEvent();
			if (pagination) {
				document
					.querySelector(`#${id} .swiper-pagination .slider-bullet.current`)
					.classList.remove('reset-progress');
			}
			if (autoplay) {
				swiper?.autoplay?.start();
			}
		}
	};

	const handleReachEnd = () => {
		timeToReachEndOfSlider({ time: performance.now() - t0InitSlider });
	};

	useEffect(() => {
		if (swiperElement) {
			if (autoplay) {
				swiperElement?.autoplay?.start();
			} else {
				swiperElement?.autoplay?.stop();
			}
			swiperElement.update();
		}
	}, [children, autoplay]);

	return React.Children.count(children) ? (
		<Swiper
			id={id}
			watchSlidesProgress
			className={className}
			slidesOffsetBefore={slidesOffsetBefore}
			spaceBetween={20}
			slidesPerColumn={slidesPerColumn}
			slidesPerColumnFill="row"
			slidesPerGroup={slidesPerGroup}
			preventClicks
			slidesPerView={slidersPerView}
			onInit={handleInitSlide}
			onReachEnd={handleReachEnd}
			onTouchStart={handleTouch}
			onTouchEnd={handleTouch}
			// onSlideChangeTransitionStart={() =>
			//   document.getElementsByClassName('slider-bullet current')[0].classList.remove('progress')
			// }
			// onTransitionEnd={() =>
			//   document.getElementsByClassName('slider-bullet current')[0].classList.add('progress')
			// }
			autoplay={
				autoplay && React.Children.count(children) > 1
					? {
							delay: autoplayDelay,
							disableOnInteraction: false,
					  }
					: false
			}
			pagination={
				pagination && {
					type: 'custom',
					renderCustom: (swiper, current, total) =>
						customBulletPagination(swiper, current, total, autoplay),
				}
			}
		>
			{React.Children.map(children, (child) => (
				<SwiperSlide>{child}</SwiperSlide>
			))}
		</Swiper>
	) : (
		<div className="empty-slider">
			<Header as="h1" icon>
				<Icon name="image" /> Prochainement.
			</Header>
		</div>
	);
};
export default Slider;
Slider.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	slidersPerView: PropTypes.number,
	slidesPerColumn: PropTypes.number,
	slidesPerGroup: PropTypes.number,

	pagination: PropTypes.bool,
	slidesOffsetBefore: PropTypes.number,
	children: PropTypes.node,
	autoplay: PropTypes.bool,
	autoplayDelay: PropTypes.number,
	onInit: PropTypes.func,
	timeOnSliderEvent: PropTypes.func,
	timeToReachEndOfSlider: PropTypes.func,
};
Slider.defaultProps = {
	id: '',
	className: '',
	slidersPerView: 1,
	slidesPerColumn: 1,
	slidesPerGroup: 1,
	slidesOffsetBefore: 0,
	pagination: true,
	children: [],
	autoplay: true,
	autoplayDelay: 2000,
	onInit() {},
	timeOnSliderEvent() {
		return { timeOnSlider: 0, sliderIndex: 0 };
	},
	timeToReachEndOfSlider() {
		return { time: 0 };
	},
};
