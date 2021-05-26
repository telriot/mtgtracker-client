//  ======================================== IMPORTS
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'common/components/Button';
import { statusSet } from 'features/collection/collectionSlice';
import { ModalButtonDiv } from 'common/components/Modal';
import {
	EditorNumInput,
	EditorCheckInput
} from 'features/collection/EditInputs';
//  ======================================== COMPONENT
const CreateModalContent = () => {
//  ======================================== HOOKS
const dispatch = useDispatch();

//  ======================================== STATE
const [owned, setOwned] = React.useState('');
const [buyPrice, setBuyPrice] = React.useState('');
const [targetPrice, setTargetPrice] = React.useState('');
const [isFoil, setIsFoil] = React.useState(false);
//  ======================================== HANDLERS
const onCancel = () => dispatch(statusSet('idle'));
const onDelete = () => console.log('handle deletion');

//  ======================================== EFFECTS
//  ======================================== JSX
return (
    <div className='flex flex-col'>
        <div className='mb-6'>
            <EditorNumInput value={owned} setValue={setOwned}>
                Copies Owned
            </EditorNumInput>
            <EditorNumInput value={buyPrice} setValue={setBuyPrice}>
                Buy Price
            </EditorNumInput>
            <EditorNumInput value={targetPrice} setValue={setTargetPrice}>
                Target Price
            </EditorNumInput>
            <EditorCheckInput checked={isFoil} setValue={setIsFoil}>
                Is Foil
            </EditorCheckInput>
        </div>

        <ModalButtonDiv>
            <Button variant='danger' onClick={onCancel}>
                Cancel
            </Button>
            <Button variant='primary' onClick={onDelete}>
                Save
            </Button>
        </ModalButtonDiv>
    </div>
);
}
 
//  ======================================== EXPORTS
export default CreateModalContent
//  ========================================