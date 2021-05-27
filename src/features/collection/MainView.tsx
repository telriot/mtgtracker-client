//  ======================================== IMPORTS
import collection from 'mocks/Collection';
import React from 'react'
import MTGItemCard from 'features/collection/MTGItemCard';
import Button from 'common/components/Button';
import SearchBar from 'common/components/SearchBar';
import Pagination from 'common/components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
	currentPageSet,
	fetchCollection,
	statusSet,
	selectCurrentPage,
	selectPages,
	selectStatus,
	selectAllCollectionItems
} from './collectionSlice';
import Modal from 'common/components/Modal';
import CreateModalContent from 'features/collection/CreateModalContent';
import DeleteModalContent from 'features/collection/DeleteModalContent';
import EditModalContent from 'features/collection/EditModalContent';
//  ======================================== COMPONENT
const CollectionView = () => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();
	//  ======================================== STATE
	const currentPage = useSelector(selectCurrentPage);
	const status = useSelector(selectStatus);
	const pages = useSelector(selectPages);
	const collection = useSelector(selectAllCollectionItems)
	console.log(collection)
	//  ======================================== HANDLERS
	const handleAdd = () => dispatch(statusSet({status:'creating'}));
	const handleCloseModal = () => dispatch(statusSet({status:'idle'}));
	//  ======================================== EFFECTS
	React.useEffect(() => 
	{
		dispatch(fetchCollection({id:'123'}))
	}, [])
	//  ======================================== JSX
	return (
		<>
			<div className='container mx-auto py-8'>
				<div className='flex justify-between mb-4'>
					<SearchBar />
					<Button onClick={handleAdd}>Add</Button>
				</div>
				<div>
					{collection.map((card) => (
						<MTGItemCard
							key={card.id}
							card={card}
						/>
					))}
				</div>
				<div className='flex justify-end'>
					<Pagination
						pages={pages}
						activePage={currentPage}
						setPage={(page: number) =>
							dispatch(currentPageSet(page))
						}
						maxButtons={7}
					/>
				</div>
			</div>
			<Modal onClose={handleCloseModal} isOpen={status !== 'idle'}>
				{status === 'creating' ? (
					<CreateModalContent />
				) : status === 'deleting' ? (
					<DeleteModalContent />
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
