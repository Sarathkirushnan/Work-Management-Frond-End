import api from '../../../service/axiosService';

const updateUser = (data) => {
	const body = data;
	return new Promise((resolve, reject) => {
		api('put', null, `/employee`, body, '')
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

const getUserById = (id) => {
	return new Promise((resolve, reject) => {
		api('get', null, `/employee/${id}`, '', '')
			.then((response) => {
				console.log({ response });
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

const getUserByEmail = (email) => {
	return new Promise((resolve, reject) => {
		api('get', null, `/employee/email/${email}`, '', '')
			.then((response) => {
				console.log({ response });
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export { updateUser, getUserById, getUserByEmail };
