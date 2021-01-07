import { createSlice } from '@reduxjs/toolkit';

const InterestList = [
	'Mode homme',
	'Mode femme',
	'Chaussures homme',
	'Bébé / enfants / jouets ',
	'Bijouterie et accessoires',
	'Montres',
	'Maquillage',
	'Parfumerie',
	'Maison et déco',
	'Sport homme',
	'Sport femme',
	'High tech ',
	'Restauration',
].map((interest, index) => ({ id: index + 1, label: interest }));

const brandSlice = createSlice({
	name: 'interests',
	initialState: {
		interestsIgnoredOnce: JSON.parse(localStorage.getItem('interestsIgnoredOnce')) || false,
		list: InterestList,
		open: true,
	},
	reducers: {
		openModal: (state, action) => ({ ...state, open: action.payload }),
		setInterestsIgnoredOnce: (state, action) => {
			localStorage.setItem('interestsIgnoredOnce', action.payload);
			return { ...state, interestsIgnoredOnce: action.payload };
		},
		setGetInterests: (state, action) => ({ all: action.payload }),
		setGetInterestsSuccess: () => {},
	},
});

export const { setInterestsIgnoredOnce, openModal } = brandSlice.actions;

export default brandSlice.reducer;
