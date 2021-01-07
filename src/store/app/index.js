import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'app',
	initialState: {
		socialAuth: { open: false, withEmail: false },
		numberVerificationModal: { open: false },
		phoneAuth: { open: true },
		notification: { show: false, type: 'wonPoints' },
	},

	reducers: {
		openSocialAuth: (state, action) => ({
			...state,
			socialAuth: action.payload,
		}),
		openPhoneAuth: (state, action) => ({ ...state, phoneAuth: { open: action.payload } }),
		openNumberVerificationModal: (state, action) => ({
			...state,
			numberVerificationModal: { open: action.payload },
		}),
		setNotification: (state, action) => ({ ...state, notification: action.payload }),
	},
});
export const {
	openSocialAuth,
	openNumberVerificationModal,
	setNotification,
	openPhoneAuth,
} = brandSlice.actions;

export default brandSlice.reducer;
