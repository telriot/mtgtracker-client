//  ======================================== IMPORTS

import React from 'react';
import usePagination from 'common/hooks/usePagination';
import clsx from 'clsx';
//  ======================================== SUBCOMPONENT
export interface PaginationButtonProps {
	children: React.ReactNode;
	disabled?: boolean;
	onClick: () => void;
	isActive?: boolean;
	id: string;
}

const PaginationButton: React.FC<PaginationButtonProps> = ({
	children,
	disabled,
	onClick,
	isActive,
	id
}) => {
	return (
		<div
			aria-label={id}
			onClick={!disabled && onClick}
			className={clsx(
				'grid justify-center items-center',
				'h-6 w-6 rounded',
				'hover:bg-primary-dark transition-colors',
				'text-sm text-white cursor-pointer',
				{
					'bg-primary-dark': isActive,
					'bg-primary-light': disabled,
					'bg-primary': !isActive && !disabled
				}
			)}>
			{children}
		</div>
	);
};
//  ======================================== SUBCOMPONENT
const PaginationEllipsis = () => {
	return (
		<div
			aria-label='pagination-ellipsis'
			className={clsx(
				'grid justify-center items-center',
				'h-6 w-6 rounded',
				'bg-primary hover:bg-primary-dark transition-colors',
				'text-white text-sm cursor-pointer'
			)}>
			...
		</div>
	);
};
//  ======================================== COMPONENT
export interface PaginationProps {
	activePage: number;
	disabled?: boolean;
	pages: number;
	maxButtons?: number;
	setPage: (page: number) => void;
}
const Pagination : React.FC<PaginationProps> = ({
	activePage,
	disabled,
	pages,
	setPage,
	maxButtons = 5
}: PaginationProps) => {
	//  ======================================== HOOKS
	//  ======================================== STATE
	const {
		pageIndexes,
		showFirst,
		showLast,
		showStartEllipsis,
		showEndEllipsis,
		showBack,
		showNext
	} = usePagination(activePage, pages, maxButtons);

	//  ======================================== HANDLERS
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div className='flex flex-row gap-x-1' aria-label='pagination'>
			{showBack && (
				<PaginationButton
					id='pagination-prev-button'
					disabled={disabled}
					onClick={() => setPage(Math.max(1, activePage - 1))}>
					&#8249;
				</PaginationButton>
			)}
			{showFirst && (
				<PaginationButton
					id='pagination-first-button'
					disabled={disabled}
					onClick={() => setPage(1)}>
					{1}
				</PaginationButton>
			)}
			{showStartEllipsis && <PaginationEllipsis />}

			{pageIndexes.map((page) => (
				<PaginationButton
					id={`pagination-page-${page}`}
					key={`pagination-${page}`}
					disabled={disabled && page !== activePage}
					onClick={() => setPage(page)}
					isActive={page === activePage}>
					{page}
				</PaginationButton>
			))}

			{showEndEllipsis && <PaginationEllipsis />}
			{showLast && (
				<PaginationButton
					id='pagination-last-button'
					disabled={disabled}
					onClick={() => setPage(pages)}>
					{pages}
				</PaginationButton>
			)}
			{showNext && (
				<PaginationButton
					id='pagination-next-button'
					onClick={() => setPage(Math.min(pages, activePage + 1))}>
					&#8250;
				</PaginationButton>
			)}
		</div>
	);
};

//  ======================================== EXPORTS
export default Pagination;
//  ========================================
