//  ======================================== IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import { bulkDeleteCollectionItems, selectAsyncStatus, selectSelectedCardIds, statusSet } from 'features/collection/collectionSlice';
import Button from 'common/components/Button';
import { ModalButtonDiv, ModalTitle } from 'common/components/Modal';
//  ======================================== COMPONENT
const BulkDeleteModalContent = () => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();
	//  ======================================== STATE
	const asyncStatus = useSelector(selectAsyncStatus)
	const selectedCardIds = useSelector(selectSelectedCardIds)
	//  ======================================== HANDLERS
	const handleCancel = () => dispatch(statusSet({status:'idle'}));
	const handleDelete = () => dispatch(bulkDeleteCollectionItems())
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div className='flex flex-col'>
			<ModalTitle>
				Confirm deleting {selectedCardIds.length} items from your collection?
			</ModalTitle>
			<ModalButtonDiv>
				<Button disabled={asyncStatus==='pending'}variant='danger' onClick={handleCancel}>
					Cancel
				</Button>
				<Button disabled={asyncStatus==='pending'} variant='primary' onClick={handleDelete}>
					Confirm
				</Button>
			</ModalButtonDiv>
		</div>
	);
};

//  ======================================== EXPORTS
export default BulkDeleteModalContent;
//  ========================================
