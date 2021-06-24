//  ======================================== IMPORTS
import clsx from 'clsx'
//  ======================================== COMPONENT
export interface NumInputProps {
	id: string;
	value: string | number;
	setValue: (value: string) => void;
    className?:string
}

const NumInput = ({ value, setValue, id, className }: NumInputProps) => {
	//  ======================================== HOOKS
	//  ======================================== STATE
	//  ======================================== HANDLERS
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.target;
		const parsed = parseFloat(value) > 0 ? value : ('0' as string);
		setValue(parsed);
	};
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<input
			id={id}
			type='number'
			step='any'
			value={value.toString() || 0}
			onChange={handleChange}
			className={clsx('w-20 py-1 px-1 rounded border-2 border-secondary-light text-right bg-card-bg text-text-primary', className)}
		/>
	);
};

//  ======================================== EXPORTS
export default NumInput;
//  ========================================
