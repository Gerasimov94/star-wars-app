import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { Gender, ICharacter } from 'src/common/types';

const initialState: { isFetching: boolean; character: ICharacter } = {
	isFetching: true,
	character: {
		name: '',
		height: '',
		mass: '',
		hair_color: '',
		skin_color: '',
		eye_color: '',
		birth_year: '',
		gender: Gender.NA,
		homeworld: '',
		films: [],
		species: [],
		vehicles: [],
		starships: [],
		created: new Date().toDateString(),
		edited: new Date().toDateString(),
		url: '',
	},
};

export const characterSlice = createSlice({
	name: 'character',
	initialState,
	reducers: {
		setIsFetching: (state, action: PayloadAction<boolean>) => {
			state.isFetching = action.payload;

			return state;
		},
		setCharacter: (state, action: PayloadAction<ICharacter>) => {
			state = {
				...state,
				character: action.payload,
				isFetching: false,
			};
			return state;
		},
		updateCharacter: (state, action: PayloadAction<Partial<ICharacter>>) => {
			state.character = { ...state.character, ...action.payload };

			return state;
		},
	},
});

export const { updateCharacter, setCharacter, setIsFetching } = characterSlice.actions;

export default characterSlice.reducer;
