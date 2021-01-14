import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'user',
	initialState: { currentUser: undefined, points: 0, loadingUser: true, loginIn: false },
	reducers: {
		setUser: (state, action) => ({ ...state, currentUser: action.payload, loadingUser: false }),
		setUserPoints: (state, action) => ({
			...state,
			currentUser: { ...state.currentUser, points: action.payload },
		}),
		addBrandToVisitedList: (state, action) => ({
			...state,
			currentUser: { list_visite: action.payload },
		}),
		setParticipatedEvent: (state, action) => ({
			...state,
			currentUser: {
				...state.currentUser,
				mes_events: [...state.currentUser.mes_events, action.payload],
			},
		}),
	},
});

export const {
	setUser,
	setUserPoints,
	addBrandToVisitedList,
	setParticipatedEvent,
} = brandSlice.actions;

export default brandSlice.reducer;
