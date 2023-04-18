import { ICharacter } from 'src/common/types';

export interface CharactersResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: ICharacter[];
}
