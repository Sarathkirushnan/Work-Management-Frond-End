import api from '../../../service/axiosService';

const addCompanyJob = (data) => {
	const body = data;
	return new Promise((resolve, reject) => {
		api('post', null, `/workplaceJob`, body, '')
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
const getUnAllocatCompanys = () => {
	return new Promise((resolve, reject) => {
		api('get', null, `/workplace/un-allocated`, '', '')
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
const getAllJobs = () => {
	return new Promise((resolve, reject) => {
		api('get', null, `/job`, '', '')
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

const checkNewJobExist = (name) => {
	return new Promise((resolve, reject) => {
		api('get', null, `/job/check-name/${name}`, '', '')
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

const getAllCompanyAndJobs = () => {
	return new Promise((resolve, reject) => {
		api('get', null, `/workplaceJob`, '', '')
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
export {
	getUnAllocatCompanys,
	addCompanyJob,
	getAllJobs,
	checkNewJobExist,
	getAllCompanyAndJobs,
};
