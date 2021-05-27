//  ======================================== IMPORTS
import collection from 'mocks/Collection';
import MTGItemCard from 'features/collection/MTGItemCard';
import Button from 'common/components/Button';
import SearchBar from 'common/components/SearchBar';
import Pagination from 'common/components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import {
	currentPageSet,
	statusSet,
	selectCurrentPage,
	selectPages,
	selectStatus
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
	//  ======================================== HANDLERS
	const onAdd = () => dispatch(statusSet('creating'));
	const onCloseModal = () => dispatch(statusSet('idle'));
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<>
			<div className='container mx-auto py-8'>
				<div className='flex justify-between mb-4'>
					<SearchBar />
					<Button onClick={onAdd}>Add</Button>
				</div>
				<div>
					{collection.map((card, index) => (
						<MTGItemCard
							key={`${card.cardName}-${index}`}
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
			<Modal onClose={onCloseModal} isOpen={status !== 'idle'}>
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
