import { createSlice } from '@reduxjs/toolkit';

const brandSlice = createSlice({
	name: 'event',
	initialState: {
		list: [],
		loadingEvents: true,
		loading : false,
		error : ''
	},
	reducers: {
		setAllEventsSuccess: (state, action) => ({
			...state,
			list: action.payload,
			loadingEvents: false,
			loading : false
		}),
		AllEventsLoading : (state, ) => ({
			...state,
			loading : true
		}),
		AllEventsError : (state, action) => ({
			...state,
			loading : false,
			error : action.payload
		})
	},
});
export const { setAllEventsSuccess , AllEventsLoading , AllEventsError } = brandSlice.actions;

export default brandSlice.reducer;
