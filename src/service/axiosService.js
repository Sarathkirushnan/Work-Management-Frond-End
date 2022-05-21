import axios from 'axios';
import { SYSTEM_CONFIG } from '../utils/SystemConfig';

const addParamsToURL = (url, params) => {
	if (params) {
		const temp = url;
		return temp;
	}
	return url;
};

const getHeaders = (adHeaders) => {
	return {
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			...adHeaders,
		},
	};
};

export default function api(method, header, endPoint, data, params) {
	const baseURL = SYSTEM_CONFIG.baseUrl;
	const url = addParamsToURL(baseURL + endPoint, params);
	const headers = getHeaders(header === null ? {} : header).headers;

	return new Promise((resolve, reject) => {
		axios({
			method,
			url,
			data,
			headers,
			beforeRedirect: 'follow',
		})
			.then((response) => {
				resolve(response);
			})
			.catch((error) => {
				reject(error.response);
			});
	});
}
