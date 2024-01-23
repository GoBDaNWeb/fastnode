import { animated, useSpring } from 'react-spring';

import './accordion.scss';

const Accordion = ({ isShow, onClick, title, children }) => {
	const accordionClass = `accordion ${isShow ? 'active' : ''}`;
	const contentClass = `content ${isShow ? 'show' : ''}`;
	const { height, opacity } = useSpring({
		from: { height: 0, opacity: 0 },
		to: {
			height: isShow ? 'auto' : 0,
			opacity: isShow ? 1 : 0
		}
	});
	return (
		<div className={accordionClass}>
			<div onClick={onClick} className='title-wrapper'>
				<span>{title}</span>
				<div className='icon'></div>
			</div>

			<animated.div
				style={{
					overflow: 'hidden',
					height,
					opacity,
					transition: 'height 0.3s ease-out, opacity 0.3s ease-out'
				}}
				className={contentClass}
			>
				{children}
			</animated.div>
		</div>
	);
};

export default Accordion;
