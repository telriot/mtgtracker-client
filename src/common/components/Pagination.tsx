//  ======================================== IMPORTS

import React from 'react';
import usePagination from 'common/hooks/usePagination';
//  ======================================== SUBCOMPONENT
export interface PaginationButtonProps {
	children: React.ReactNode;
	disabled?: boolean;
	onClick: () => void;
	isActive?: boolean;
}

const PaginationButton = ({
	children,
	disabled,
	onClick,
	isActive
}: PaginationButtonProps) => {
	return (
		<div
			onClick={!disabled && onClick}
			className={`grid justify-center items-center h-6 w-6 ${
				isActive
					? 'bg-primary-dark'
					: disabled
					? 'bg-primary-light'
					: 'bg-primary'
			} rounded text-sm cursor-pointer text-white hover:bg-primary-dark transition-colors`}>
			{children}
		</div>
	);
};
//  ======================================== SUBCOMPONENT
const PaginationEllipsis = () => {
	return (
		<div className='grid justify-center items-center h-6 w-6 bg-primary rounded text-sm cursor-pointer text-white hover:bg-primary-dark transition-colors'>
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
const Pagination = ({
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
		<div className='flex flex-row gap-x-1'>
			{showBack && (
				<PaginationButton
					disabled={disabled}
					onClick={() => setPage(Math.max(1, activePage - 1))}>
						&#8249;
				</PaginationButton>
			)}
			{showFirst && (
				<PaginationButton
					disabled={disabled}
					onClick={() => setPage(1)}>
					{1}
				</PaginationButton>
			)}
			{showStartEllipsis && <PaginationEllipsis />}

			{pageIndexes.map((page) => (
				<PaginationButton
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
					disabled={disabled}
					onClick={() => setPage(pages)}>
					{pages}
				</PaginationButton>
			)}
			{showNext && (
				<PaginationButton
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
