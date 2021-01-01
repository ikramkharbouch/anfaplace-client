import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'app',
	initialState: {
		socialAuth: { open: false },
		numberVerificationModal: { open: true },
	},
	reducers: {
		openSocialAuth: (state, action) => ({ ...state, socialAuth: { open: action.payload } }),
		openNumberVerificationModal: (state, action) => ({
			...state,
			numberVerificationModal: { open: action.payload },
		}),
	},
});
export const { openNumberVerificationModal } = brandSlice.actions;

export default brandSlice.reducer;
