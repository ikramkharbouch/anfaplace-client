import { useEffect, useState } from 'react';
import axios from 'axios';

const useDataApi = ({ url, method = 'get', data }) => {
	const [dataState, setDataState] = useState({
		data: [],
		isFetching: true,
		success: false,
		error: null,
	});
	const baseURL = process.env.REACT_APP_API_URL;

	useEffect(() => {
		const API = async () => {
			try {
				setDataState({ ...dataState });
				const response = await axios.request({
					baseURL,
					url,
					method,
					data,
				});
				setDataState({
					...dataState,
					data: response.data,
					success: response.data.success,
					isFetching: false,
				});
			} catch (e) {
				setDataState({ ...dataState, isFetching: false, success: false, error: e });
			}
		};
		API();
	}, []); // Runs once

	return [dataState];
};

export default useDataApi;
