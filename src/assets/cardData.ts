import { LangVariant, SelectOption } from 'types';

export const mtgLanguages: LangVariant[] = [
	'EN',
	'CN',
	'TW',
	'FR',
	'DE',
	'IT',
	'JP',
	'KO',
	'PT',
	'RU',
	'ES'
];
export const langOptions: SelectOption[] = mtgLanguages.map((option) => ({
	label: option,
	value: option
}));
