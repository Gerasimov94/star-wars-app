import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { CharactersResponse } from 'src/modules/characters/types';

const initialState: CharactersResponse = {
	count: 0,
	next: null,
	previous: null,
	results: [],
};

export const charactersSlice = createSlice({
	name: 'characters',
	initialState,
	reducers: {
		setCharactersData: (state, action: PayloadAction<CharactersResponse>) => {
			state = action.payload;
		},
		updateCharacters: (state, action: PayloadAction<CharactersResponse['results']>) => {
			state = {
				...state,
				results: action.payload,
			};
		},
	},
});

// Action creators are generated for each case reducer function
export const { setCharactersData, updateCharacters } = charactersSlice.actions;

export default charactersSlice.reducer;
