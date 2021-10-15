import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'shared',
	initialState: {
		auth: {
			authModalOpen: false,
			authTelModalOpen: false,
			updateTelModalOpen: false,
		},
	},

	reducers: {
		openAuthModal: (state, action) => ({
			...state,
			auth: {
				...state.auth,
				authModalOpen: action.payload,
			},
		}),
		openAuthTelModal: (state, action) => ({
			...state,
			auth: {
				...state.auth,
				authTelModalOpen: action.payload,
			},
		}),
		openUpdateTelModal: (state, action) => ({
			...state,
			auth: {
				...state.auth,
				updateTelModalOpen: action.payload,
			},
		}),
	},
});
export const { openAuthModal, openAuthTelModal , openUpdateTelModal } = brandSlice.actions;

export default brandSlice.reducer;
