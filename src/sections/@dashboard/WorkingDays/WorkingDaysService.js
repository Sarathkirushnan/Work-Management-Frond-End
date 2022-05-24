import api from '../../../service/axiosService';

const addCompanyWithJobs = (data) => {
	const body = data;
	return new Promise((resolve, reject) => {
		api('post', null, `/working-days`, body, '')
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
const getCompanyWithJobs = () => {
	return new Promise((resolve, reject) => {
		api('get', null, `/workplace/allocated`, '', '')
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
const getJobsByCompanyId = (id) => {
	return new Promise((resolve, reject) => {
		api('get', null, `/job/company/${id}`, '', '')
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

const getWorkdaysByEmployeeId = (id) => {
	return new Promise((resolve, reject) => {
		api('get', null, `/working-days/employee/${id}`, '', '')
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

export {
	getCompanyWithJobs,
	addCompanyWithJobs,
	getJobsByCompanyId,
	getWorkdaysByEmployeeId,
};
