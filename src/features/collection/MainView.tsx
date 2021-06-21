//  ======================================== IMPORTS
import React from 'react';
import MTGItemCard from 'features/collection/MTGItemCard';
import Button from 'common/components/Button';
import Pagination from 'common/components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
	currentPageSet,
	fetchCollection,
	fetchCollectionSummary,
	statusSet,
	selectAsyncStatus,
	selectCurrentPage,
	selectPages,
	selectStatus,
	selectAllCollectionItems,
	selectSearchBarInput,
	selectSelectedCardIds,
	selectCollectionSummary
} from './collectionSlice';
import Modal from 'common/components/Modal';
import BulkDeleteModalContent from 'features/collection/BulkDeleteModalContent';
import CreateModalContent from 'features/collection/CreateModalContent';
import DeleteModalContent from 'features/collection/DeleteModalContent';
import EditModalContent from 'features/collection/EditModalContent';
import LoadingOverlay from 'common/components/LoadingOverlay';
import { useDebounce } from 'use-debounce';
import { useMediaQuery } from 'react-responsive';
import Toolbar from 'features/collection/Toolbar';
//  ======================================== COMPONENT
const CollectionView = () => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();
	//  ======================================== STATE
	const currentPage = useSelector(selectCurrentPage);
	const asyncStatus = useSelector(selectAsyncStatus);
	const status = useSelector(selectStatus);
	const pages = useSelector(selectPages);
	const collection = useSelector(selectAllCollectionItems);
	const collectionSummary = useSelector(selectCollectionSummary)
	const searchBarInput = useSelector(selectSearchBarInput);
	const selectedCardIds = useSelector(selectSelectedCardIds);
	const [debouncedSearch] = useDebounce(searchBarInput, 300);
	const isMd = useMediaQuery({ query: '(min-width: 640px)' });
	const isMultiSelecting = selectedCardIds.length > 1;
	//  ======================================== HANDLERS
	const handleBulkDelete = () =>
		dispatch(statusSet({ status: 'bulkDeleting' }));
	const handleCloseModal = () => dispatch(statusSet({ status: 'idle' }));

	const handleSetPage = (page: number) => {
		dispatch(currentPageSet(page));
		dispatch(fetchCollection({ id: '123' }));
	};
	//  ======================================== EFFECTS
	React.useEffect(() => {
		!collectionSummary && dispatch(fetchCollectionSummary())
	}, [collectionSummary])
	React.useEffect(() => {
		dispatch(currentPageSet(1));
		dispatch(fetchCollection({ id: '123' }));
	}, [debouncedSearch]);
	//  ======================================== JSX
	return (
		<>
			{!isMd && isMultiSelecting && (
				<div className='fixed w-full py-4 px-2'>
					<Button variant='danger' block onClick={handleBulkDelete}>
						Delete Selected
					</Button>
				</div>
			)}

			<div className='container px-2 sm:mx-auto py-8'>
				
				<Toolbar />
				<div className='relative'>
					{status === 'idle' && asyncStatus === 'pending' && (
						<LoadingOverlay />
					)}
					{collection.map((card) => (
						<MTGItemCard key={card.id} card={card} />
					))}
				</div>
				{pages ? (
					<div className='flex justify-end'>
						<Pagination
							pages={pages}
							activePage={currentPage}
							setPage={handleSetPage}
							maxButtons={5}
						/>
					</div>
				) : null}
			</div>
			<Modal onClose={handleCloseModal} isOpen={status !== 'idle'}>
				{status === 'creating' ? (
					<CreateModalContent />
				) : status === 'deleting' ? (
					<DeleteModalContent />
				) : status === 'bulkDeleting' ? (
					<BulkDeleteModalContent />
				) : status === 'editing' ? (
					<EditModalContent />
				) : null}
			</Modal>
		</>
	);
};

//  ======================================== EXPORTS
export default CollectionView;
//  ========================================
