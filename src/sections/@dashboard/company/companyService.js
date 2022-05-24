import api from '../../../service/axiosService';

const addCompany = (data) => {
	const body = data;
	return new Promise((resolve, reject) => {
		api('post', null, `/workplace`, body, '')
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
const updateCompany = (data) => {
	const body = data;
	return new Promise((resolve, reject) => {
		api('put', null, `/workplace`, body, '')
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

const getAllCompany = () => {
	return new Promise((resolve, reject) => {
		api('get', null, `/workplace`, '', '')
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
const deleteCompany = (id) => {
	return new Promise((resolve, reject) => {
		api('delete', null, `/workplace/${id}`, '', '')
			.then((response) => {
				console.log('response', response.data);
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
export { addCompany, getAllCompany, deleteCompany, updateCompany };
