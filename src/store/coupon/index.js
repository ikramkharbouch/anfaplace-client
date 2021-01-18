import { createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';

const couponSlice = createSlice({
	name: 'coupon',
	initialState: {
		list: null,
		loading: true,
		current: {},
		loadingCoupon: true,
	},
	reducers: {
		setCouponList: (state, action) =>
			update(state, { list: { $set: action.payload }, loading: { $set: false } }),
		setCurrentCoupon: (state, action) =>
			update(state, { current: { $set: action.payload }, loadingCoupon: { $set: false } }),
		setLoadingCoupon: (state, action) => update(state, { loading: { $set: action.payload } }),
	},
});

export const { setCouponList, setCurrentCoupon, setLoadingCoupon } = couponSlice.actions;

export default couponSlice.reducer;
