import { expect, test } from 'vitest';
import { capitalize } from '../../src/helpers';

test('capitalizes the first letter of a string', () => {
	expect(capitalize('hello')).toBe('Hello');
});

test('returns an empty string if input is not a string', () => {
	expect(capitalize('luke skywalker')).toBe('Luke skywalker');
});

test('capitalizes the first letter of a sentence', () => {
	expect(capitalize('the may force be with you')).toBe('The may force be with you');
});
