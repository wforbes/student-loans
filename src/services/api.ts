import axios, { AxiosError } from 'axios';
import { Routes } from '@/app/_constants/Routes';

export const api = axios.create({
	baseURL: Routes.api.baseUrl
});

export const handleApiError = (err: AxiosError, handleAuthLogout?: () => void) => {
	if (err.response?.status === 401 && handleAuthLogout) {
		handleAuthLogout();
		return null;
	}
	throw err;
};