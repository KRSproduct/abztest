import axios from 'axios';
import qs from 'qs';

const instance = axios.create({
	baseURL: 'https://frontend-test-assignment-api.abz.agency/api/v1',

	paramsSerializer: (params: any) =>
		qs.stringify(params, { arrayFormat: 'brackets' }),
});

export function useAxios() {
	return instance;
}
