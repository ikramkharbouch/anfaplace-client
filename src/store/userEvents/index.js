import { createSlice } from '@reduxjs/toolkit';
import { GET_USER_EVENTS_LOADING , GET_USER_EVENTS_SUCCESS , GET_USER_EVENTS_FAIL } from './actions';

const brandSlice = createSlice({
	name: 'userEvents',
	initialState: {
		success: false,
		events: [],
		loading: true,
		message: ''
	},
	reducers: {
		getUserEvents: (state, action) => {
			switch (action.payload.type) {
				case GET_USER_EVENTS_LOADING:
					return ({
						...state,
						loading: true
					});

				case GET_USER_EVENTS_SUCCESS:
					return ({
						...state,
						success: action.payload.payload.success,
						events: action.payload.payload.events,
						loading: false
					});

				case GET_USER_EVENTS_FAIL:
					return ({
						...state,
						success: false,
						events: [],
						loading: false,
						message: action.payload.payload.message
					});
			
				default:
					return state;
			}
		}
	},
});

export const {
	getUserEvents
} = brandSlice.actions;

export default brandSlice.reducer;
