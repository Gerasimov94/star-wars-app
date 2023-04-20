import { describe, expect, test } from 'vitest';
import data from '../mocks/characters.json';
import { getFilteredCharacters } from '../../src/modules/characters/selectors';
import { Gender } from '../../src/common/types';

describe('Filtered cards', () => {
	test('returns female characters', () => {
		const mockState = {
			charactersReducer: {
				...data,
				filters: {
					genders: Object.values(Gender).filter((gender) => gender === Gender.Female),
				},
			},
		};

		const filteredChars = getFilteredCharacters(mockState);

		expect(filteredChars).toEqual(data.characters.filter((char) => char.gender === Gender.Female));
	});

	test('returns male characters', () => {
		const mockState = {
			charactersReducer: {
				...data,
				filters: {
					genders: Object.values(Gender).filter((gender) => gender === Gender.Male),
				},
			},
		};

		const filteredChars = getFilteredCharacters(mockState);

		expect(filteredChars).toEqual(data.characters.filter((char) => char.gender === Gender.Male));
	});

	test('returns all characters', () => {
		const mockState = {
			charactersReducer: {
				...data,
				filters: {
					genders: Object.values(Gender),
				},
			},
		};

		const filteredChars = getFilteredCharacters(mockState);

		expect(filteredChars).toEqual(data.characters);
	});
});
