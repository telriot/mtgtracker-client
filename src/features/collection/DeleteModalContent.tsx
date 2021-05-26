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
	const onCancel = () => dispatch(statusSet('idle'));
	const onDelete = () => console.log('handle deletion');
	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div className='flex flex-col'>
			<div className='mb-8 text-center'>
				Confirm deleting SOMECARD from your collection?
			</div>
			<ModalButtonDiv>
				<Button variant='danger' onClick={onCancel}>
					Cancel
				</Button>
				<Button variant='primary' onClick={onDelete}>
					Confirm
				</Button>
			</ModalButtonDiv>
		</div>
	);
};

//  ======================================== EXPORTS
export default DeleteModalContent;
//  ========================================
