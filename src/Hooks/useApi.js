import { useEffect, useState } from 'react';
import axios from 'axios';

const useDataApi = ({ url, method, data }) => {
	const [dataState, setDataState] = useState({ data: [], isFetching: false, success: false });
	const baseURL = process.env.REACT_APP_API_URL;

	useEffect(() => {
		const fetchDataFromApi = async () => {
			try {
				setDataState({ ...dataState, isFetching: true });
				const response = axios.request({
					baseURL,
					url,
					method,
					data,
				});

				setDataState({
					...dataState,
					data: response.data,
					isFetching: false,
				});
			} catch (e) {
				console.log(e);
				setDataState({ ...dataState, isFetching: false, success: false });
			}
		};
		fetchDataFromApi();
	}, []); // Runs once

	return [dataState];
};

export default useDataApi;
