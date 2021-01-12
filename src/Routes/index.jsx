import React, { lazy, Suspense, useEffect, useRef } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import Home from 'src/Screens/Home';
import QRcode from 'src/Screens/QRcode';
import Tour from 'src/Screens/Tour';
import Brand from 'src/Screens/Brand';
import { Dimmer, Loader } from 'semantic-ui-react';
import Shopping from 'src/Screens/Shopping';
import Restauration from 'src/Screens/Restauration';
import Entertainment from 'src/Screens/Entertainment';
import Coupon from 'src/Screens/Coupon';
import MyVisitedList from 'src/Screens/MyVisitedList';
import MyEventsList from 'src/Screens/MyEventsList';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import './Routes.less';
import ScrollToTop from 'src/utils/ScrollToTop';

const Survey = lazy(() => import('../Screens/Survey'));
// const OfferDetails = lazy(() => import('../Screens/OfferDetails'));
const Article = lazy(() => import('../Screens/Articles/index'));
const Shops = lazy(() => import('src/Screens/Brands'));
const CouponList = lazy(() => import('src/Screens/CouponList'));
const CouponListItem = lazy(() => import('src/Screens/CouponListItem'));
const EntertainmentDetails = lazy(() => import('src/Screens/Entertainment/EntertainmentDetails'));

const Routes = () => {
	const location = useLocation();
	const { pathname } = location;
	const timeout = 2000;
	const currentKey = pathname.split('/')[1] || '/';
	const getPathDepth = (pathName) => {
		let pathArr = pathName.split('/');
		pathArr = pathArr.filter((n) => n !== '');
		return pathArr.length;
	};
	const prevDepthRef = useRef(getPathDepth(pathname));
	const stickToTop = ['/'].includes(pathname);

	useEffect(() => {
		prevDepthRef.current = getPathDepth(pathname);
	}, [pathname]);

	const prevDepth = prevDepthRef.current;

	return (
		<TransitionGroup component={null}>
			<CSSTransition
				key={currentKey}
				timeout={timeout}
				classNames="pageSlider"
				mountOnEnter={false}
				unmountOnExit
			>
				<div
					className={`screen ${stickToTop ? 'stick-to-top' : ''}  ${
						getPathDepth(pathname) - prevDepth >= 0 ? 'left' : 'right'
					}`}
				>
					<ScrollToTop />

					<Switch location={location}>
						<Route exact path="/" component={Home} />
						<Route exact path="/offer-details" component={Survey} />
						<Route path="/qrcode" component={QRcode} />
						<Route path="/tour" component={Tour} />
						<Route path="/all-brands" component={Tour} />
						<Route exact path="/brand/:id" component={Brand} />
						<Route exact path="/survey/:id">
							<Suspense
								fallback={
									<Dimmer active>
										<Loader />
									</Dimmer>
								}
							>
								<Survey />
							</Suspense>
						</Route>
						<Route exact path="/article/:id">
							<Suspense
								fallback={
									<Dimmer active>
										<Loader />
									</Dimmer>
								}
							>
								<Article />
							</Suspense>
						</Route>
						<Route exact path="/brands">
							<Suspense
								fallback={
									<Dimmer active>
										<Loader />
									</Dimmer>
								}
							>
								<Shops />
							</Suspense>
						</Route>
						<Route exact path="/coupon-list">
							<Suspense
								fallback={
									<Dimmer active>
										<Loader />
									</Dimmer>
								}
							>
								<CouponList />
							</Suspense>
						</Route>
						<Route exact path="/coupon-list/:id">
							<Suspense
								fallback={
									<Dimmer active>
										<Loader />
									</Dimmer>
								}
							>
								<CouponListItem />
							</Suspense>
						</Route>
						<Route exact path="/shopping" component={Shopping} />
						<Route exact path="/restauration" component={Restauration} />
						<Route exact path="/entertainment" component={Entertainment} />
						<Route exact path="/events" component={Entertainment} />
						<Route exact path="/events/:id">
							<Suspense
								fallback={
									<Dimmer active>
										<Loader />
									</Dimmer>
								}
							>
								<EntertainmentDetails />
							</Suspense>
						</Route>
						<Route exact path="/coupon/:id" component={Coupon} />
						<Route exact path="/my-visited-list" component={MyVisitedList} />
						<Route exact path="/my-events-list" component={MyEventsList} />
					</Switch>
				</div>
			</CSSTransition>
		</TransitionGroup>
	);
};

export default Routes;
