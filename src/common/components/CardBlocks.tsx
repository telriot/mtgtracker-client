//  ======================================== IMPORTS
import { FiEdit, FiTrash } from 'react-icons/fi';
import React from 'react';

//  ======================================== SUBCOMPONENT
interface CardTextBlockProps {
	header: string;
	position?: 'start' | 'end';
	size?: 'sm';
	span?: number;
	children?: React.ReactNode;
}

export const CardTextBlock = ({
	header,
	position = 'end',
	size,
	span = 1,
	children
}: CardTextBlockProps) => {
	const textAlignment = position === 'end' ? 'right' : 'left';
	return (
		<div
			className={`flex flex-col items-${position} col-span-${span} cursor-default`}>
			<div className={`text-${textAlignment} text-xs text-gray-400`}>
				{header}
			</div>
			<div
				className={`text-${textAlignment} ${
					size === 'sm' ? 'text-s' : ''
				}`}>
				{children}
			</div>
		</div>
	);
};

//  ======================================== SUBCOMPONENT
export interface CardActionBlockProps {
	onEdit: () => void;
	onDelete: () => void;
}
export const CardActionBlock = ({ onEdit, onDelete }: CardActionBlockProps) => {
	const iconSize = 20;
	return (
		<div className='flex flex-row justify-end items-center col-span-1'>
			<FiEdit
				onClick={onEdit}
				size={iconSize}
				className='mr-3 cursor-pointer'
			/>
			<FiTrash
				onClick={onDelete}
				size={iconSize}
				className='cursor-pointer'
			/>
		</div>
	);
};
