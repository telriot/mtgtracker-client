//  ======================================== IMPORTS
import React from 'react'
import { FaBuffer, FaEuroSign, FaDollarSign } from 'react-icons/fa';
import clsx from 'clsx';
import { CollectionSummary as TSummary} from 'types';
import { FC } from 'react';
//  ======================================== COMPONENT
interface CollectionSummaryProps {
	className?: string, summary:TSummary
}
const CollectionSummary : FC<CollectionSummaryProps>= ({ className, summary }) => {
	//  ======================================== HOOKS
	//  ======================================== STATE
	//  ======================================== HANDLERS
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return summary.isLoaded ? (
		<div aria-label='collection-summary' className={clsx('flex text-text-primary', className)}>
			<div className='flex items-center mr-1'>
				<FaBuffer />
				<div aria-label='cards-total-quantity' className='mr-1'>{summary.cardsQuantity}</div>
			</div>
			<div className='flex items-center mr-1'>
				<FaDollarSign />
				<div aria-label='cards-total-usd' className='mr-1'>{parseFloat(summary.totalUsd.toFixed(2))}</div>
			</div>
			<div className='flex items-center mr-1'>
				<FaEuroSign />
				<div aria-label='cards-total-eur' className='mr-1'>{parseFloat(summary.totalEur.toFixed(2))}</div>
			</div>
		</div>
	) : (
		<div aria-label='loading-indicator'>Loading...</div>
	);
};

//  ======================================== EXPORTS
export default CollectionSummary;
//  ========================================
