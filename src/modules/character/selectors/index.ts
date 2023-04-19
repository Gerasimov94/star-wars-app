import { RootState } from 'src/store';

export const getIsCharacterFetching = (state: RootState) => state.characterReducer.isFetching;
export const getCharacter = (state: RootState) => state.characterReducer.character;
