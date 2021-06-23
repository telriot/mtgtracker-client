//  ======================================== IMPORTS

import Checkbox from 'common/components/Checkbox';
// import React from 'react';
import NumberInput from 'common/components/NumInput'
//  ======================================== SUBCOMPONENT
export interface NumInputProps {
	children: string;
	value: string | number;
	setValue: (value: string) => void;
}
export const NumInput = ({
	children,
	value,
	setValue
}: NumInputProps) => {
	// const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	const { value } = event.target;
	// 	const parsed = parseFloat(value) > 0 ? value :'0' as string;
	// 	setValue(parsed);
	// };
	return (
		<div className='flex justify-between items-center mb-3'>
			<label htmlFor={children}>{children}</label>
			<NumberInput id={children} value={value} setValue={setValue}/>
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
