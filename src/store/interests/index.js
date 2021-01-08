import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'interests',
	initialState: {
		interestsIgnoredOnce: JSON.parse(localStorage.getItem('interestsIgnoredOnce')) || false,
		interestsConfirmed: JSON.parse(localStorage.getItem('interestsConfirmed')) || false,
		list: [],
		selected: [],
		open: true,
		loading: true,
	},
	reducers: {
		openModal: (state, action) => ({ ...state, open: action.payload }),
		setInterestsIgnoredOnce: (state, action) => {
			localStorage.setItem('interestsIgnoredOnce', action.payload);
			return { ...state, interestsIgnoredOnce: JSON.parse(action.payload), open: false };
		},
		setInterestsConfirmed: (state, action) => {
			localStorage.setItem('interestsConfirmed', action.payload);
			return { ...state, interestsConfirmed: JSON.parse(action.payload), open: false };
		},
		checkInterest: (state, action) => {
			const selected = [...state.selected];
			if (action.payload.checked) {
				selected.push(action.payload.id);
			} else {
				const index = selected.indexOf((id) => id === action.payload.id);
				selected.splice(index, 1);
			}
			return { ...state, selected };
		},
		setGetInterests: (state, action) => ({ ...state, list: action.payload, loading: false }),
		setGetInterestsSuccess: () => {},
	},
});

export const {
	setInterestsIgnoredOnce,
	openModal,
	setInterestsConfirmed,
	setGetInterests,
	checkInterest,
} = brandSlice.actions;

export default brandSlice.reducer;
