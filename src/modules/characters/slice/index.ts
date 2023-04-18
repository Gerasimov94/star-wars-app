import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CharactersResponse } from 'src/modules/characters/types';

const initialState: CharactersResponse & { isFetching: boolean } = {
	count: 0,
	next: null,
	previous: null,
	results: [],
	isFetching: false,
};

export const charactersSlice = createSlice({
	name: 'characters',
	initialState,
	reducers: {
		setIsFetching: (state, action: PayloadAction<boolean>) => {
			state.isFetching = action.payload;

			return state;
		},
		setCharactersData: (state, action: PayloadAction<CharactersResponse>) => {
			state = {
				...action.payload,
				isFetching: false,
			};
			return state;
		},
		removeCharacter: (state, action: PayloadAction<CharactersResponse['results'][number]['url']>) => {
			state.results = state.results.filter((character) => character.url !== action.payload);
			return state;
		},
		updateCharacters: (state, action: PayloadAction<CharactersResponse['results']>) => {
			state = {
				...state,
				results: action.payload,
			};

			return state;
		},
	},
});

export const { setCharactersData, updateCharacters, setIsFetching, removeCharacter } = charactersSlice.actions;

export default charactersSlice.reducer;
