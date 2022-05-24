import api from '../../../service/axiosService';

const addWorkTime = (data) => {
	const body = data;
	return new Promise((resolve, reject) => {
		api('post', null, `/in-out-time`, body, '')
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};

const getAllWorkTimeByUserId = (id) => {
	return new Promise((resolve, reject) => {
		api('get', null, `/in-out-time/employee/${id}`, '', '')
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
const getInOutTimeByDateEmployeId = (date, id) => {
	return new Promise((resolve, reject) => {
		api('get', null, `/in-out-time/employee/${id}/date/${date}`, '', '')
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
const getWorkingDaysByDateEmployeId = (date, id) => {
	return new Promise((resolve, reject) => {
		api('get', null, `/working-days/employee/${id}/date/${date}`, '', '')
			.then((response) => {
				resolve(response.data);
			})
			.catch((error) => {
				reject(error);
			});
	});
};
export {
	addWorkTime,
	getAllWorkTimeByUserId,
	getWorkingDaysByDateEmployeId,
	getInOutTimeByDateEmployeId,
};
