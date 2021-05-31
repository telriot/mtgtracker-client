//  ======================================== IMPORTS
import React, { useContext } from 'react';
import MTGItemCard from 'features/collection/MTGItemCard';
import Button from 'common/components/Button';
import SearchBar from 'common/components/SearchBar';
import Pagination from 'common/components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
	currentPageSet,
	fetchCollection,
	statusSet,
	selectAsyncStatus,
	selectCurrentPage,
	selectPages,
	selectStatus,
	selectAllCollectionItems,
	selectSearchBarInput,
	selectSelectedCardIds,
	searchBarInputChanged
} from './collectionSlice';
import Modal from 'common/components/Modal';
import BulkDeleteModalContent from 'features/collection/BulkDeleteModalContent';
import CreateModalContent from 'features/collection/CreateModalContent';
import DeleteModalContent from 'features/collection/DeleteModalContent';
import EditModalContent from 'features/collection/EditModalContent';
import Loader from 'react-loader-spinner';
import { ThemeContext } from 'index';
import { useDebounce } from 'use-debounce';

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
	const searchBarInput = useSelector(selectSearchBarInput)
	const selectedCardIds = useSelector(selectSelectedCardIds);
	const { colors } = useContext(ThemeContext);
	const [debouncedSearch] = useDebounce(searchBarInput, 300)
	//  ======================================== HANDLERS
	const handleAdd = () => dispatch(statusSet({ status: 'creating' }));
	const handleBulkDelete = () =>
		dispatch(statusSet({ status: 'bulkDeleting' }));
	const handleCloseModal = () => dispatch(statusSet({ status: 'idle' }));
	const handleSearchBarChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => dispatch(searchBarInputChanged(event.target.value));
	const handleSetPage = (page: number) => {
		dispatch(currentPageSet(page))
		dispatch(fetchCollection({ id: '123' }))
	}
	//  ======================================== EFFECTS
	React.useEffect(() => {
		dispatch(currentPageSet(1))
		dispatch(fetchCollection({ id: '123' }));
	}, [debouncedSearch]);
	//  ======================================== JSX
	return (
		<>
			<div className='container mx-auto py-8'>
				<div className='flex justify-between mb-4'>
					<SearchBar value={searchBarInput} onChange={handleSearchBarChange} />
					<div className='flex'>
						{selectedCardIds.length > 1 ? (
							<Button className='mr-3' onClick={handleBulkDelete}>
								Delete Selected
							</Button>
						) : null}
						<Button onClick={handleAdd}>Add</Button>
					</div>
				</div>
				{status === 'idle' && asyncStatus === 'pending' ? (
					<div className='w-100 h-100 flex items-center justify-center'>
						<Loader
							type='Puff'
							color={colors.primary}
							height={100}
							width={100}
							timeout={3000}
						/>
					</div>
				) : (
					<div>
						{collection.map((card) => (
							<MTGItemCard key={card.id} card={card} />
						))}
					</div>
				)}
				{pages ? (
					<div className='flex justify-end'>
						<Pagination
							pages={pages}
							activePage={currentPage}
							setPage={handleSetPage}
							maxButtons={7}
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
