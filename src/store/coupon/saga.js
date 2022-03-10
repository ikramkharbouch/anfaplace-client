import { API, getUserToken } from 'src/utils/utilsFunctions';
import { call, put } from 'redux-saga/effects';
import { setCouponList, setCurrentCoupon } from 'src/store/coupon';

// eslint-disable-next-line import/prefer-default-export
export function* getUserCouponList() {
	try {
		const token = yield getUserToken();
		const result = yield call(() => API({ url: '/getValidCouponsForUser', token }));
		yield put(setCouponList(result.data.lists));
	} catch (e) {
		console.error(e);
	}
}
export function* getUserCouponById({ payload }) {
	try {
		const token = yield getUserToken();
		const result = yield call(() =>
			API({ url: '/getCouponForUser ', method: 'post', data: { idCoupon: payload }, token })
		);
		yield put(setCurrentCoupon(result.data.object));
	} catch (e) {
		console.error(e);
	}
}
