//  ======================================== IMPORTS

import Checkbox from "common/components/Checkbox";

//  ======================================== SUBCOMPONENT
export interface EditorNumInputProps {
	children: string;
	value: string;
	setValue: (value: string) => void;
}
export const EditorNumInput = ({
	children,
	value,
	setValue
}: EditorNumInputProps) => {
	return (
		<div className='flex justify-between items-center mb-3'>
			<label htmlFor={children}>{children}</label>
			<input
				id={children}
				type='number'
				step='any'
				value={value}
				onChange={(e) => setValue(e.target.value)}
				className='py-1 px-1 border-2 border-gray-300 rounded w-20 text-right'
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

			<Checkbox id={children} checked={checked} setValue={setValue}/>
		</div>
	);
};
