//  ======================================== IMPORTS
import { useSelector } from 'react-redux';
import { selectCollectionSummary } from './collectionSlice';
import { FaBuffer, FaEuroSign, FaDollarSign } from 'react-icons/fa';
import clsx from 'clsx';
//  ======================================== COMPONENT
const CollectionSummary = ({ className }: { className?: string }) => {
	//  ======================================== HOOKS
	//  ======================================== STATE
	const summary = useSelector(selectCollectionSummary);
	//  ======================================== HANDLERS
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return summary ? (
		<div className={clsx('flex', className)}>
			<div className='flex items-center mr-1'>
				<FaBuffer />
				<div className='mr-1'>{summary.cardsQuantity}</div>
			</div>
			<div className='flex items-center mr-1'>
				<FaDollarSign />
				<div className='mr-1'>{summary.totalUsd}</div>
			</div>
			<div className='flex items-center mr-1'>
				<FaEuroSign />
				<div className='mr-1'>{summary.totalEur}</div>
			</div>
		</div>
	) : (
		<div>Loading...</div>
	);
};

//  ======================================== EXPORTS
export default CollectionSummary;
//  ========================================
