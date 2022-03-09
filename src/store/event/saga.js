import { call, put } from 'redux-saga/effects';
import { API } from 'src/utils/utilsFunctions';
import dayjs from 'dayjs';

import { setAllEventsSuccess, AllEventsError, AllEventsLoading } from './index';

// eslint-disable-next-line import/prefer-default-export
export function* fetchAllEvent() {
	try {
		yield put(AllEventsLoading());
		const result = yield call(() => API({ url: 'getAllEvents' }));
		const sorteEvents = result?.data?.lists
			?.sort((date1, date2) => {
				const d1 = dayjs(date1.data.fin_time, 'DD/MM/YYYY');
				const d2 = dayjs(date2.data.fin_time, 'DD/MM/YYYY');
				return d2.diff(d1);
			})
			?.map((item) => {
				console.log(dayjs(item.data.fin_time, 'DD/MM/YYYY').isBefore(dayjs().format()));
				return {
					...item,
					expired: dayjs(item.data.fin_time, 'DD/MM/YYYY').isBefore(dayjs().format()),
				};
			});
		yield put(setAllEventsSuccess(sorteEvents));
	} catch (e) {
		console.error(e);
		yield put(AllEventsError(e?.message || 'Error'));
		yield put({ type: 'FETCH_FAILED' });
	}
}
