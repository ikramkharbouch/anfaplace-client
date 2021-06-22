/* eslint-disable no-param-reassign */
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'production') {
	document.documentElement.addEventListener('contextmenu', (e) => {
		// console.log(e);
		e.preventDefault();
	});
}
