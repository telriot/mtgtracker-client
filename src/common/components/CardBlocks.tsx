//  ======================================== IMPORTS
import { FiEdit, FiTrash } from 'react-icons/fi';
import React from 'react';
import clsx from 'clsx';
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
			className={clsx(
				'flex flex-col cursor-default',
				`items-${position} col-span-${span}`
			)}>
			<div
				className={clsx(
					`text-${textAlignment}`,
					'text-xs text-gray-400'
				)}>
				{header}
			</div>
			<div
				className={clsx(
					'w-full',
					`text-${textAlignment}`,
					size === 'sm' && 'text-sm'
				)}>
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
		<div className='flex flex-row items-center justify-end col-span-1'>
			<FiEdit
				aria-label='edit-button'
				onClick={onEdit}
				size={iconSize}
				className='mr-3 cursor-pointer'
			/>
			<FiTrash
				aria-label='delete-button'
				onClick={onDelete}
				size={iconSize}
				className='cursor-pointer'
			/>
		</div>
	);
};
