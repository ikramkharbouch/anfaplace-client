import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'interests',
	initialState: {
		interestsIgnoredOnce: JSON.parse(localStorage.getItem('interestsIgnoredOnce')) || false,

		list: [
			{ id: 1, label: 'Vetements homme' },
			{ id: 1, label: 'Vetement femme' },
			{ id: 2, label: 'Chaussures homme' },
			{ id: 3, label: 'Chassures femmes' },
			{ id: 4, label: 'Maquillage/Parfumerie' },
			{ id: 5, label: 'Food' },
			{ id: 1, label: 'Maison / Décoration' },
			{ id: 6, label: 'Sport Enfants' },
		],
	},
	reducers: {
		setInterestsIgnoredOnce: (state, action) => {
			localStorage.setItem('interestsIgnoredOnce', action.payload);
			return { ...state, interestsIgnoredOnce: action.payload };
		},
		setGetInterests: (state, action) => ({ all: action.payload }),
		setGetInterestsSuccess: () => {},
	},
});

export const { setInterestsIgnoredOnce } = brandSlice.actions;

export default brandSlice.reducer;
