//  ======================================== IMPORTS
import { useDispatch } from 'react-redux';
import { deleteCollectionItem, statusSet } from 'features/collection/collectionSlice';
import Button from 'common/components/Button';
import { ModalButtonDiv, ModalTitle } from 'common/components/Modal';
import parseItemName from 'common/utils/parsing/parseItemName';
import { AsyncStatus, CollectionItem } from 'types';
//  ======================================== COMPONENT
interface DeleteModalContentProps {
	status: AsyncStatus
	target: CollectionItem<any>
}
const DeleteModalContent = ({status, target}: DeleteModalContentProps) => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();
	//  ======================================== STATE
	//  ======================================== HANDLERS
	const handleCancel = () => dispatch(statusSet({status:'idle'}));
	const handleDelete = () => dispatch(deleteCollectionItem())
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div aria-label='delete-modal' className='flex flex-col'>
			<ModalTitle>
				Confirm deleting {parseItemName(target)} from your collection?
			</ModalTitle>
			<ModalButtonDiv>
				<Button disabled={status==='pending'} variant='danger' onClick={handleCancel}>
					Cancel
				</Button>
				<Button disabled={status==='pending'} variant='primary' onClick={handleDelete}>
					Confirm
				</Button>
			</ModalButtonDiv>
		</div>
	);
};

//  ======================================== EXPORTS
export default DeleteModalContent;
//  ========================================
