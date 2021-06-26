//  ======================================== IMPORTS

import React from 'react';
import clsx from 'clsx';
//  ======================================== COMPONENT
export interface SearchBarProps {
	className?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	value: string;
	id?: string;
}
const SearchBar: React.FC<SearchBarProps> = ({
	className,
	onChange,
	value,
	id = 'search-bar'
}) => {
	//  ======================================== HOOKS
	//  ======================================== STATE
	//  ======================================== HANDLERS
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div className={clsx(className)}>
			<input
				aria-label={id}
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
