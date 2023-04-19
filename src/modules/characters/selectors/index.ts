import { createSelector } from '@reduxjs/toolkit';
import { RootState } from 'src/store';

export const getGendersFilter = (state: RootState) => state.charactersReducer.filters.genders;
export const getCharacters = (state: RootState) => state.charactersReducer.characters;
export const getIsCharactersFetching = (state: RootState) => state.charactersReducer.isFetching;
export const getTotalNumberOfCharacters = (state: RootState) => state.charactersReducer.total;

export const getFilteredCharacters = createSelector([getCharacters, getGendersFilter], (characters, genders) =>
	characters.filter((char) => genders.includes(char.gender)),
);
