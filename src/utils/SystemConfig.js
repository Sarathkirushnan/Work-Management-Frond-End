const BASE_URL: string = 'localhost';
const WM_PORT = 8081;
const WM_BASE_URL = `http://${BASE_URL}:${WM_PORT}/api/v1`;

export const SYSTEM_CONFIG = {
	baseUrl: WM_BASE_URL,
};

export const NOTIFICATION_TYPE = {
	error: 'error',
	success: 'success',
	warning: 'warning',
	info: 'info',
};
