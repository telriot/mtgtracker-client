//  ======================================== IMPORTS
import { useDispatch } from 'react-redux';
import {
	bulkDeleteCollectionItems,
	statusSet
} from 'features/collection/collectionSlice';
import Button from 'common/components/Button';
import { ModalButtonDiv, ModalTitle } from 'common/components/Modal';
import { AsyncStatus } from 'types';
//  ======================================== COMPONENT
interface BulkDeleteModalContentProps {
	status: AsyncStatus;
	ids: string[];
}
const BulkDeleteModalContent = ({
	status,
	ids
}: BulkDeleteModalContentProps) => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();
	//  ======================================== STATE

	//  ======================================== HANDLERS
	const handleCancel = () => dispatch(statusSet({ status: 'idle' }));
	const handleDelete = () => dispatch(bulkDeleteCollectionItems());
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div aria-label='bulk-delete-modal' className='flex flex-col'>
			<ModalTitle>
				Confirm deleting {ids.length} items from your collection?
			</ModalTitle>
			<ModalButtonDiv>
				<Button
					disabled={status === 'pending'}
					variant='danger'
					onClick={handleCancel}>
					Cancel
				</Button>
				<Button
					disabled={status === 'pending'}
					variant='primary'
					onClick={handleDelete}>
					Confirm
				</Button>
			</ModalButtonDiv>
		</div>
	);
};

//  ======================================== EXPORTS
export default BulkDeleteModalContent;
//  ========================================
