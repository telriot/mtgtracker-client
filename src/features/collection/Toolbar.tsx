//  ======================================== IMPORTS
import React from 'react';
import Button from 'common/components/Button';
import SearchBar from 'common/components/SearchBar';
import FilterSection from 'features/collection/FilterSection'
import { useDispatch, useSelector } from 'react-redux';
import {
	currentPageSet,
	fetchCollection,
	statusSet,
	selectSearchBarInput,
	selectSelectedCardIds,
	searchBarInputChanged
} from './collectionSlice';
import { useDebounce } from 'use-debounce';
import { useMediaQuery } from 'react-responsive';
import { FaFilter } from 'react-icons/fa';
//  ======================================== COMPONENT
const Toolbar = () => {
	//  ======================================== HOOKS
	const dispatch = useDispatch();
	const isMd = useMediaQuery({ query: '(min-width: 640px)' });
	//  ======================================== STATE
	const [isFilterOpen, setIsFilterOpen] = React.useState(false);
	const searchBarInput = useSelector(selectSearchBarInput);
	const selectedCardIds = useSelector(selectSelectedCardIds);
	const [debouncedSearch] = useDebounce(searchBarInput, 300);
	const isMultiSelecting = selectedCardIds.length > 1;
	//  ======================================== HANDLERS
	const handleAdd = () => dispatch(statusSet({ status: 'creating' }));
	const handleBulkDelete = () =>
		dispatch(statusSet({ status: 'bulkDeleting' }));
	const handleSearchBarChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => dispatch(searchBarInputChanged(event.target.value));
	const toggleFilters = () => setIsFilterOpen((prev) => !prev);
	//  ======================================== EFFECTS
	React.useEffect(() => {
		dispatch(currentPageSet(1));
		dispatch(fetchCollection({ id: '123' }));
	}, [debouncedSearch]);
	//  ======================================== JSX
	return (
		<div>
			<div className='flex justify-between mb-4'>
				<div className='flex'>
					<SearchBar
						value={searchBarInput}
						className='mr-3'
						onChange={handleSearchBarChange}
					/>
					<Button className='mr-3' onClick={toggleFilters}>
						<FaFilter />
					</Button>
				</div>

				<div className='flex'>
					{isMultiSelecting && isMd ? (
						<Button className='mr-3' onClick={handleBulkDelete}>
							Delete Selected
						</Button>
					) : null}
					<Button onClick={handleAdd}>Add</Button>
				</div>
			</div>
            <FilterSection isOpen={isFilterOpen}/>
		</div>
	);
};

//  ======================================== EXPORTS
export default Toolbar;
//  ========================================
