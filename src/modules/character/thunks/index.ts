import { batch } from 'react-redux';
import { setCharacter, setIsFetching } from 'src/modules/character/slice';
import { AppThunk } from 'src/store';
import apiRequest from 'src/utils/request';
import { showErrorNotification } from 'src/helpers';

export const getCharacterRequest = (id: number): AppThunk => {
	return async (dispatch) => {
		try {
			dispatch(setIsFetching(true));

			const response = await apiRequest(`/people/${id}`);

			const character = await response.json();

			batch(() => {
				dispatch(setIsFetching(false));
				dispatch(setCharacter(character));
			});
		} catch (err) {
			showErrorNotification();

			dispatch(setIsFetching(false));
		}
	};
};
