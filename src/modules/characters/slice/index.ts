import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Gender, ICharacter } from 'src/common/types';

const initialState: { characters: ICharacter[]; isFetching: boolean; filters: { genders: Gender[] }; total: number } = {
	characters: [],
	total: 0,
	filters: {
		genders: Object.values(Gender) as Gender[],
	},
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
		setCharactersData: (state, action: PayloadAction<{ characters: ICharacter[]; total: number }>) => {
			state = {
				...state,
				characters: action.payload.characters,
				total: action.payload.total,
				isFetching: false,
			};
			return state;
		},
		removeCharacter: (state, action: PayloadAction<ICharacter['url']>) => {
			state.characters = state.characters.filter((character) => character.url !== action.payload);
			return state;
		},
		updateCharacters: (state, action: PayloadAction<Partial<ICharacter>>) => {
			state = {
				...state,
				characters: state.characters.map((character) => {
					if (character.url === action.payload?.url) {
						return {
							...character,
							...action.payload,
						};
					}

					return character;
				}),
			};

			return state;
		},
		updateFilters: (state, action: PayloadAction<Gender[]>) => {
			state.filters.genders = action.payload;

			return state;
		},
	},
});

export const { setCharactersData, updateCharacters, setIsFetching, removeCharacter, updateFilters } = charactersSlice.actions;

export default charactersSlice.reducer;
