// eslint-disable-next-line no-shadow
export enum Gender {
	Female = 'female',
	Male = 'male',
	NA = 'n/a',
	Hermaphrodite = 'hermaphrodite',
}

export type ApiString = string; // refers to swapi entities

export interface ICharacter {
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
	created: string;
	edited: string;
	url: string;
}
