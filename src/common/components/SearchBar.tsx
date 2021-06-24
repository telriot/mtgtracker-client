//  ======================================== IMPORTS

import React from 'react';

//  ======================================== COMPONENT
export interface SearchBarProps {
	className?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
}
const SearchBar = ({ className, onChange, value }: SearchBarProps) => {
	//  ======================================== HOOKS
	//  ======================================== STATE
	//  ======================================== HANDLERS
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div className={className || ''}>
			<input
				className=' w-full py-2 px-4 rounded bg-card-bg border-secondary-light border-2 text-text-primary'
				type='text'
                onChange={onChange}
                value={value}
				placeholder='Search in your collection'
			/>
		</div>
	);
};

//  ======================================== EXPORTS
export default SearchBar;
//  ========================================
