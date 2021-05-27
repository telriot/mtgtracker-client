//  ======================================== IMPORTS
import { useDispatch, useSelector } from 'react-redux';
import { statusSet } from 'features/collection/collectionSlice';
import Button from 'common/components/Button';
import { ModalButtonDiv } from 'common/components/Modal';
//  ======================================== COMPONENT
const DeleteModalContent = () => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();
	//  ======================================== STATE
	//  ======================================== HANDLERS
	const handleCancel = () => dispatch(statusSet('idle'));
	const handleDelete = () => console.log('handle deletion');
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div className='flex flex-col'>
			<div className='mb-8 text-center'>
				Confirm deleting SOMECARD from your collection?
			</div>
			<ModalButtonDiv>
				<Button variant='danger' onClick={handleCancel}>
					Cancel
				</Button>
				<Button variant='primary' onClick={handleDelete}>
					Confirm
				</Button>
			</ModalButtonDiv>
		</div>
	);
};

//  ======================================== EXPORTS
export default DeleteModalContent;
//  ========================================
