import { batch } from 'react-redux';
import { setCharactersData, setIsFetching } from 'src/modules/characters/slice';
import { AppThunk } from 'src/store';
import apiRequest, { makeURLString } from 'src/utils/request';
import { showErrorNotification } from 'src/helpers';

export const getCharactersRequest = (
	controller?: AbortController,
	data: { page?: number; search?: string } = {
		page: 1,
		search: '',
	},
): AppThunk => {
	return async (dispatch) => {
		try {
			dispatch(setIsFetching(true));

			const response = await apiRequest(makeURLString('/people', data), { signal: controller?.signal });

			const characters = await response.json();

			batch(() => {
				dispatch(setIsFetching(false));
				dispatch(setCharactersData(characters));
			});
		} catch (err) {
			if (!controller?.signal.aborted) {
				showErrorNotification();
			}

			dispatch(setIsFetching(false));
		}
	};
};
