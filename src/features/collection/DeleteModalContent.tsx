//  ======================================== IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import { deleteCollectionItem, selectAsyncStatus, selectTargetObject, statusSet } from 'features/collection/collectionSlice';
import Button from 'common/components/Button';
import { ModalButtonDiv, ModalTitle } from 'common/components/Modal';
import parseItemName from 'common/utils/parsing/parseItemName';
//  ======================================== COMPONENT
const DeleteModalContent = () => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();
	//  ======================================== STATE
	const asyncStatus = useSelector(selectAsyncStatus)
	const targetItem = useSelector(selectTargetObject)
	//  ======================================== HANDLERS
	const handleCancel = () => dispatch(statusSet({status:'idle'}));
	const handleDelete = () => dispatch(deleteCollectionItem())
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div className='flex flex-col'>
			<ModalTitle>
				Confirm deleting {parseItemName(targetItem)} from your collection?
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
export default DeleteModalContent;
//  ========================================
