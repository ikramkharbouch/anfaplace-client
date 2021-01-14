import axios from 'axios';
import firebase from 'src/utils/initApp';
import { call } from 'redux-saga/effects';

export const arrayBufferToBase64 = (buffer) => {
	let binary = '';
	const bytes = [].slice.call(new Uint8Array(buffer));
	bytes.forEach((b) => {
		binary += String.fromCharCode(b);
	});
	return `data:image/jpeg;base64,${window.btoa(binary)}`;
};

export const API = ({ url, method, data, token }) => {
	const baseURL = process.env.REACT_APP_API_URL;
	const headers = token ? { Authorization: `Bearer ${token}` } : null;
	return axios({
		baseURL,
		url,
		method,
		data,
		headers,
	});
};

export function* getUserToken() {
	const user = firebase.auth().currentUser;
	return yield call(() => user.getIdToken(true));
}

export const removeTags = (html) => html.replace(/<[^>]+>/g, '');


export const shuffle = (array) => {
	let currentIndex = array.length;
	let temporaryValue;
	let randomIndex;
	const newArray = array.slice();
	// While there remains elements to shuffle...
	while (currentIndex) {
	  randomIndex = Math.floor(Math.random() * currentIndex);
	  currentIndex -= 1;
	  // Swap it with the current element.
	  temporaryValue = newArray[currentIndex];
	  newArray[currentIndex] = newArray[randomIndex];
	  newArray[randomIndex] = temporaryValue;
	}
	return newArray;
  };