//  ======================================== IMPORTS

import Checkbox from 'common/components/Checkbox';
import React from 'react';
import { ThemeContext } from 'index';
import NumberInput from 'common/components/NumInput';
import Select from 'react-select';
import { customStyles } from 'styles/reactSelectStyles';
import { SelectOption } from 'types';
//  ======================================== SUBCOMPONENT
export interface NumInputProps {
	children: string;
	value: string | number;
	setValue: (value: string) => void;
}
export const NumInput = ({ children, value, setValue }: NumInputProps) => {
	// const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	const { value } = event.target;
	// 	const parsed = parseFloat(value) > 0 ? value :'0' as string;
	// 	setValue(parsed);
	// };
	return (
		<div className='flex justify-between items-center mb-3'>
			<label htmlFor={children}>{children}</label>
			<NumberInput id={children} value={value} setValue={setValue} />
		</div>
	);
};
//  ======================================== SUBCOMPONENT
export interface SelectInputProps {
	children: string;
	value: string;
	setValue: (value: string) => void;
	options:SelectOption[]
}

export const SelectInput = ({
	children,
	value,
	setValue,
	options
}: SelectInputProps) => {
	//  ======================================== HOOKS
	const theme = React.useContext(ThemeContext);
	const customSelectStyles = customStyles(theme);
	//  ======================================== HANDLERS
	const handleLanguageChange = ({ value }: { value: string }) =>
		setValue(value);
	return (
		<div className='flex justify-between items-center mb-3  '>
			<label htmlFor={children}>{children}</label>
			<Select
			className='w-20'
				id={children}
				defaultValue={options[0]}
				value={{ label: value || 'All', value }}
				options={options}
				getOptionLabel={(lang) => lang.label}
				getOptionValue={(lang) => lang.value}
				onChange={handleLanguageChange}
				styles={customSelectStyles}
			/>
		</div>
	);
};
//  ======================================== SUBCOMPONENT
export interface CheckInputProps {
	children: string;
	checked: boolean;
	setValue: (value: boolean) => void;
}
export const CheckInput = ({
	children,
	checked,
	setValue
}: CheckInputProps) => {
	return (
		<div className='flex justify-between items-center mb-3'>
			<label htmlFor={children}>{children}</label>
			<Checkbox id={children} checked={checked} setValue={setValue} />
		</div>
	);
};
