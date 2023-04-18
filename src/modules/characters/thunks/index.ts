import { batch } from 'react-redux';
import { setCharactersData, setIsFetching } from 'src/modules/characters/slice';
import { AppThunk } from 'src/store';
import apiRequest from 'src/utils/request';
import { showErrorNotification } from 'src/helpers';

export const getCharactersRequest = (
	data: { page?: number; count?: number; search?: string } = {
		page: 1,
		count: 12,
		search: '',
	},
): AppThunk => {
	console.log(data);
	return async (dispatch) => {
		try {
			dispatch(setIsFetching(true));

			const response = await apiRequest(`/people?page=${data.page}&search=${data.search}`);
			const characters = await response.json();

			batch(() => {
				dispatch(setIsFetching(false));
				dispatch(setCharactersData(characters));
			});
		} catch (err) {
			showErrorNotification();

			dispatch(setIsFetching(false));
		}
	};
};
