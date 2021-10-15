import * as React from 'react';
import { useRef  } from 'react';
import {  Icon  } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

import { motion, useCycle } from 'framer-motion';
import useDimensions from 'src/Hooks/UseDimensions';
import MenuToggle from './MenuToggle';
import Navigation from './Navigation';

const sidebar = {
	open: (height = 1000) => ({
		clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
		transition: {
			type: 'spring',
			stiffness: 20,
			restDelta: 2,
		},
	}),
	closed: {
		clipPath: 'circle(0px at 40px 40px)',
		transition: {
			delay: 0.5,
			type: 'spring',
			stiffness: 400,
			damping: 40,
		},
	},
};

const Example = () => {
	const [isOpen, toggleOpen] = useCycle(false, true);
	const containerRef = useRef(null);
	const { height } = useDimensions(containerRef);
    const [currentURL , setCurrentURL] = React.useState(null)

    const history = useHistory();


	React.useEffect(() => {
		// console.log(isOpen)
		if (isOpen) {
			document.querySelector('body').style.overflow = 'hidden';
		} else {
			document.querySelector('body').style.overflow = 'unset';
		}
	}, [isOpen]);


    React.useEffect(() => {
		setCurrentURL(history.location.pathname);
	}, [history.location.pathname]);

	history.listen((data) => {
		setCurrentURL(data.pathname);
	});

	return (
		<motion.nav
			initial={false}
			animate={isOpen ? 'open' : 'closed'}
			custom={height}
			ref={containerRef}
			className="test"
		>
			<motion.div className="background" variants={sidebar}  />
			<Navigation toggle={() => toggleOpen()} />
            { currentURL !== '/' && <Icon className = 'back-icon ' onClick = { () => history.goBack() } name = 'arrow left' /> }
            { currentURL === '/' && <MenuToggle toggle={() => toggleOpen()} />  }
             

			
		</motion.nav>
	);
};

export default Example;
