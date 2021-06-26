import { Theme } from "react-select";

interface ProvidedStyles {
	[x: string]: {[x: string]:unknown};
}
export const customStyles = (theme: Theme): Record<string, unknown> => ({
	control: () => ({
		border: `solid 2px ${theme.colors['secondary-light']}`,
		display: 'flex',
		borderRadius: '4px',
		backgroundColor: theme.colors['card-bg'],
		color: theme.colors['text-primary']
	}),
	input: (provided: ProvidedStyles) => ({
		...provided,
		color: theme.colors['text-primary']
	}),
	singleValue: (provided: ProvidedStyles) => ({
		...provided,
		color: theme.colors['text-primary']
	}),
	menuList: (provided: ProvidedStyles) => ({
		...provided,
		backgroundColor: theme.colors['card-bg'],
		borderRadius: '.125rem'
	}),
	option: (
		provided: ProvidedStyles,
		{ isFocused, isSelected }: Record<string, unknown>
	) => ({
		...provided,
		color: theme.colors['text-primary'],
		backgroundColor: isFocused
			? theme.colors.primary
			: isSelected
			? theme.colors['secondary-dark']
			: theme.colors['card-bg'],
		':active': {
			...(provided[':active']),
			backgroundColor: isSelected
				? theme.colors['primary-dark']
				: theme.colors['primary-dark']
		}
	})
});
