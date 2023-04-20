import { setCharactersData, setIsFetching } from 'src/modules/characters/slice';
import { AppThunk } from 'src/store';
import apiRequest, { makeURLString } from 'src/utils/request';
import { showErrorNotification } from 'src/helpers';
import { ICharacter } from 'src/common/types';

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

			if (response.ok) {
				const result: { results: ICharacter[]; count: number } = await response.json();

				dispatch(setCharactersData({ characters: result.results, total: result.count }));
			}
		} catch (err) {
			if (!controller?.signal.aborted) {
				showErrorNotification();
			}
		} finally {
			dispatch(setIsFetching(false));
		}
	};
};
