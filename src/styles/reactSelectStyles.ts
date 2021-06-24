export const customStyles = (theme: any) => ({
	control: () => ({
		border: `solid 2px ${theme.colors['secondary-light']}`,
		display: 'flex',
		borderRadius: '4px',
		backgroundColor: theme.colors['card-bg'],
		color: theme.colors['text-primary']
	}),
	input: (provided: any) => ({
		...provided,
		color: theme.colors['text-primary']
	}),
	singleValue: (provided: any) => ({
		...provided,
		color: theme.colors['text-primary']
	}),
	menuList: (provided: any) => ({
		...provided,
		backgroundColor: theme.colors['card-bg'],
		borderRadius: '.125rem'
	}),
	option: (provided: any, { isFocused, isSelected }: any) => ({
		...provided,
		color: theme.colors['text-primary'],
		backgroundColor: isFocused
			? theme.colors.primary
			: isSelected
			? theme.colors['secondary-dark']
			: theme.colors['card-bg'],
		':active': {
			...provided[':active'],
			backgroundColor: isSelected
				? theme.colors['primary-dark']
				: theme.colors['primary-dark']
		}
	})
});
