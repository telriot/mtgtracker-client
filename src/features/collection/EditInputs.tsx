//  ======================================== IMPORTS

import Checkbox from 'common/components/Checkbox';
import React from 'react';

//  ======================================== SUBCOMPONENT
export interface EditorNumInputProps {
	children: string;
	value: string | number;
	setValue: (value: string) => void;
}
export const EditorNumInput = ({
	children,
	value,
	setValue
}: EditorNumInputProps) => {
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const parsed = parseFloat(value) > 0 ? value :'0' as string;
		setValue(parsed);
	};
	return (
		<div className='flex justify-between items-center mb-3'>
			<label htmlFor={children}>{children}</label>
			<input
				id={children}
				type='number'
				step='any'
				value={value.toString()}
				onChange={handleChange}
				className='w-20 py-1 px-1 rounded border-2 border-gray-300 text-right'
			/>
		</div>
	);
};
//  ======================================== SUBCOMPONENT
export interface EditorCheckInputProps {
	children: string;
	checked: boolean;
	setValue: (value: boolean) => void;
}
export const EditorCheckInput = ({
	children,
	checked,
	setValue
}: EditorCheckInputProps) => {
	return (
		<div className='flex justify-between items-center mb-3'>
			<label htmlFor={children}>{children}</label>

			<Checkbox id={children} checked={checked} setValue={setValue} />
		</div>
	);
};
