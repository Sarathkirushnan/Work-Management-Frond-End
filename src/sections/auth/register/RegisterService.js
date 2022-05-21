import api from '../../../service/axiosService';

const registerUser = (data) => {
	const body = data;
	return new Promise((resolve, reject) => {
		api('post', null, `/employee`, body, '')
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

const getRouteDetailsById = (id) => {
	return new Promise((resolve, reject) => {
		api('get', null, `/route/${id}`, '', '')
			.then((response) => {
				console.log({ response });
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export { registerUser };
