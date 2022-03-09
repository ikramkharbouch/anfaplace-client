import { createSlice } from '@reduxjs/toolkit';
import update from 'immutability-helper';

const initialState = {
	currentUser: undefined,
	points: 0,
	loadingUser: true,
	loginIn: false,
	confirmPinLoading: false,
	qrCode: [],
	loadingQrCode: true,
	userInfo: { email: '', nom: '' },
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => ({ ...state, currentUser: action.payload, loadingUser: false }),
		updateUser: (state, action) => ({
			...state,
			loadingUser: false,
			currentUser: { ...state.currentUser, ...(action?.payload || {}) },
		}),
		setUserPoints: (state, action) => ({
			...state,
			currentUser: { ...state.currentUser, points: action.payload },
		}),
		addBrandToVisitedList: (state, action) =>
			update(state, { currentUser: { list_visite: { $push: [action.payload] } } }),
		setParticipatedEvent: (state, action) => ({
			...state,
			currentUser: {
				...state.currentUser,
				mes_events: [...(state?.currentUser?.mes_events || []), action.payload],
			},
		}),
		resetUser: () => initialState,
		setConfirmPinLoading: (state, action) => ({ ...state, confirmPinLoading: action.payload }),
		setQrcode: (state, action) =>
			update(state, { qrCode: { $set: action.payload }, loadingQrCode: { $set: false } }),
		setUserInfo: (state, action) => update(state, { userInfo: { $set: action.payload } }),
	},
});

export const {
	setUser,
	setUserInfo,
	setUserPoints,
	addBrandToVisitedList,
	setParticipatedEvent,
	setConfirmPinLoading,
	setQrcode,
	resetUser,
	updateUser,
} = userSlice.actions;

export default userSlice.reducer;
