//  ======================================== IMPORTS

import React from 'react';
import getRange from 'common/utils/arrays/getRange';
//  ======================================== UTILS

/**
 *
 * @param activePage the page you are currently on
 * @param pages the total number of pages to paginate
 * @param maxButtons the max number of buttons to display, defaults at 5
 * @returns the range of buttons to render in pagination
 */
const calcRenderedButtons = (
	activePage: number,
	pages: number,
	maxButtons: 5 | 7 | 9 = 5
) => {
	const span = Math.floor(maxButtons / 2);
	const firstPage = Math.max(
		Math.min(activePage - span, pages - maxButtons + 1),
		1
	);
	const lastPage = Math.min(Math.max(activePage + span, maxButtons), pages);
	return getRange(lastPage, firstPage);
};
//  ======================================== SUBCOMPONENT
export interface PaginationButtonProps {
	children: React.ReactNode;
	onClick: () => void;
	isActive?: boolean;
}
const PaginationButton = ({
	children,
	onClick,
	isActive
}: PaginationButtonProps) => {
	return (
		<div
			onClick={onClick}
			className={`grid justify-center items-center h-6 w-6 ${
				isActive ? 'bg-primary-dark' : 'bg-primary'
			} rounded text-sm cursor-pointer text-white hover:bg-primary-dark transition-colors`}>
			{children}
		</div>
	);
};
//  ======================================== COMPONENT
export interface PaginationProps {
	activePage: number;
	pages: number;
	maxButtons?: 5 | 7 | 9;
	setPage: (page: number) => void;
}
const Pagination = ({
	activePage,
	pages,
	setPage,
	maxButtons = 5
}: PaginationProps) => {
	//  ======================================== HOOKS
	//  ======================================== STATE
	//  ======================================== HANDLERS
	//  ======================================== EFFECTS
	//  ======================================== JSX
	const buttons = calcRenderedButtons(activePage, pages, maxButtons);
	return (
		<div className='flex flex-row gap-x-1'>
			{buttons.map((btnValue, index) =>
				//First btnValue, is not page 1
				index === 0 && btnValue > 1 ? (
					<PaginationButton
						onClick={() => setPage(activePage - 1)}
						key={`pagination-btn-${index}`}>
						&#8249;
					</PaginationButton>
				) : //Last btnValue, is not last page
				index === maxButtons - 1 && btnValue < pages ? (
					<PaginationButton
						onClick={() => setPage(activePage + 1)}
						key={`pagination-btn-${index}`}>
						&#8250;
					</PaginationButton>
				) : (
					//Other pages
					<PaginationButton
						onClick={() => setPage(btnValue)}
						isActive={activePage === btnValue}
						key={`pagination-btn-${index}`}>
						{btnValue}
					</PaginationButton>
				)
			)}
		</div>
	);
};

//  ======================================== EXPORTS
export default Pagination;
//  ========================================
