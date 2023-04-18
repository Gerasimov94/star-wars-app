import { ApiString, Gender, ICharacter } from 'src/common/types';

export interface Character {
	name: string;
	height: string;
	mass: string;
	hair_color: string;
	skin_color: string;
	eye_color: string;
	birth_year: string;
	gender: Gender;
	homeworld: string;
	films: ApiString[];
	species: ApiString[];
	vehicles: ApiString[];
	starships: ApiString[];
	created: Date;
	edited: Date;
	url: string;
}

export interface CharactersResponse {
	count: number;
	next: string | null;
	previous: string | null;
	results: ICharacter[];
}
