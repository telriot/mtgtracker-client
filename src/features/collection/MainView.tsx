//  ======================================== IMPORTS
import React, { FC } from 'react';
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
	selectCollectionSummary,
	selectFilters,
	selectTargetObject
} from './collectionSlice';
import Modal from 'common/components/Modal';
import BulkDeleteModalContent from 'features/collection/BulkDeleteModalContent';
import CreateModalContent from 'features/collection/CreateModalContent';
import DeleteModalContent from 'features/collection/DeleteModalContent';
import EditModalContent from 'features/collection/EditModalContent';
import LoadingOverlay from 'common/components/LoadingOverlay';
import { useDebouncedCallback } from 'use-debounce';
import { useMediaQuery } from 'react-responsive';
import Toolbar from 'features/collection/Toolbar';
import BulkAddModalContent from './BulkAddModalContent';
//  ======================================== COMPONENT
const CollectionView: FC<unknown> = () => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();
	//  ======================================== STATE
	const currentPage = useSelector(selectCurrentPage);
	const asyncStatus = useSelector(selectAsyncStatus);
	const status = useSelector(selectStatus);
	const pages = useSelector(selectPages);
	const collection = useSelector(selectAllCollectionItems);
	const collectionSummary = useSelector(selectCollectionSummary);
	const searchBarInput = useSelector(selectSearchBarInput);
	const selectedCardIds = useSelector(selectSelectedCardIds);
	const isMd = useMediaQuery({ query: '(min-width: 640px)' });
	const isMultiSelecting = selectedCardIds.length > 1;
	const { expansion, language, minEur, maxEur, minUsd, maxUsd } =
		useSelector(selectFilters);
	const targetItem = useSelector(selectTargetObject);

	//  ======================================== HANDLERS
	const handleBulkDelete = () =>
		dispatch(statusSet({ status: 'bulkDeleting' }));
	const handleCloseModal = () => dispatch(statusSet({ status: 'idle' }));

	const handleSetPage = (page: number) => {
		dispatch(currentPageSet(page));
		dispatch(fetchCollection({ id: '123' }));
	};
	const debouncedUpdate = useDebouncedCallback(() => {
		// dispatch(currentPageSet(1));
		dispatch(fetchCollection({ id: '123' }));
	}, 300);
	//  ======================================== EFFECTS
	React.useEffect(() => {
		!collectionSummary.isLoaded && dispatch(fetchCollectionSummary());
	}, [collectionSummary, dispatch]);
	React.useEffect(() => {
		if (!collectionSummary.isLoaded) return;
		debouncedUpdate();
	}, [
		searchBarInput,
		expansion,
		language,
		minEur,
		maxEur,
		minUsd,
		maxUsd,
		debouncedUpdate
		// collectionSummary
	]);
	React.useEffect(() => {
		if (!collectionSummary.isLoaded) return;
		if (currentPage > pages) {
			dispatch(currentPageSet(pages || 1));
			dispatch(fetchCollection({ id: '123' }));
		}
	}, [currentPage, dispatch, pages, collectionSummary]);
	//  ======================================== JSX
	return (
		<>
			{!isMd && isMultiSelecting && (
				<div className='fixed w-full py-4 px-2' style={{ zIndex: 100 }}>
					<Button variant='danger' block onClick={handleBulkDelete}>
						Delete Selected
					</Button>
				</div>
			)}

			<div className='container sm:mx-auto py-8'>
				<Toolbar />
				<div className='relative px-2'>
					{status === 'idle' && asyncStatus === 'pending' && (
						<LoadingOverlay />
					)}
					{collection.map((card) => (
						<MTGItemCard key={card.id} card={card} />
					))}
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
			</div>
			<Modal
				onClose={status === 'bulkAdding' ? null : handleCloseModal}
				isOpen={status !== 'idle'}>
				{status === 'bulkAdding' ? (
					<BulkAddModalContent />
				) : status === 'creating' ? (
					<CreateModalContent />
				) : status === 'deleting' ? (
					<DeleteModalContent
						status={asyncStatus}
						target={targetItem}
					/>
				) : status === 'bulkDeleting' ? (
					<BulkDeleteModalContent
						status={asyncStatus}
						ids={selectedCardIds}
					/>
				) : status === 'editing' ? (
					<EditModalContent
						status={asyncStatus}
						target={targetItem}
					/>
				) : null}
			</Modal>
		</>
	);
};

//  ======================================== EXPORTS
export default CollectionView;
//  ========================================
