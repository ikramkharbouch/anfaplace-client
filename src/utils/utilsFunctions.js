import axios from 'axios';

export const arrayBufferToBase64 = (buffer) => {
	let binary = '';
	const bytes = [].slice.call(new Uint8Array(buffer));
	bytes.forEach((b) => {
		binary += String.fromCharCode(b);
	});
	return `data:image/jpeg;base64,${window.btoa(binary)}`;
};

export const fetchDataFromAPI = ({ url, method, data }) => {
	const baseURL = process.env.REACT_APP_API_URL;
	return axios({
		baseURL,
		url,
		method,
		data,
	});
};
