import { ref } from 'vue';
import { useAxios } from '../composition';

export function useApi() {
	const { get, post } = useAxios();

	const users: any = ref([]);
	const positions: any = ref([]);
	const allPages: any = ref(0);
	const isLoading = ref(false);
	const tokenKey: any = ref();

	async function getCards(count?: number, page?: number) {
		const { data } = await get('/users', {
			params: {
				count: count || 5,
				page: page || 1,
			},
		});

		allPages.value = data.total_pages;

		users.value =
			data.page === 1 ? data.users : [...users.value, ...data.users];

		return data;
	}

	async function getPosition() {
		const { data } = await get('/positions');

		positions.value = data.positions;
	}

	async function getToken() {
		const { data } = await get('/token');

		tokenKey.value = data.token;
		return data;
	}

	async function addUser(payload: {
		name: string;
		email: string;
		phone: string;
		position_id: number;
		photo: string;
	}) {
		return post(`/users`, payload, {
			headers: {
				Token: `${tokenKey.value}`,
				'Content-Type': 'multipart/form-data',
			},
		}).then((res) => JSON.stringify(res));
	}

	return {
		getCards,
		getPosition,
		getToken,
		positions,
		users,
		isLoading,
		allPages,
		addUser,
		tokenKey,
	};
}
