//  ======================================== IMPORTS
import React, { FC }  from 'react';
import Select from 'react-select';
import { customStyles } from 'styles/reactSelectStyles';
import ThemeContext from 'themeContext';
import NumInput from 'common/components/NumInput';
import clsx from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import {
	filterSet,
	filtersReset,
	selectCollectionSummary,
	selectFilters
} from './collectionSlice';
import Button from 'common/components/Button';
import BulkAddButton from './BulkAddButton';

const DEFAULT_OPTION = { label: 'All', value: '' };
//  ======================================== COMPONENT
interface FilterInputProps {
	children: React.ReactElement;
	label: string;
	id: string;
}

const FilterInput: FC<FilterInputProps> = ({ children, label, id }) => {
	return (
		<div className='flex flex-col mr-3'>
			<label
				className='text-sm text-right text-secondary mb-1'
				htmlFor={id}>
				{label}
			</label>
			{React.cloneElement(children, { id })}
		</div>
	);
};

interface FilterSectionProps {
	isOpen: boolean;
}
const FilterSection : FC<FilterSectionProps> = ({ isOpen }) => {
	//  ======================================== HOOKS
	const theme = React.useContext(ThemeContext);
	const customSelectStyles = customStyles(theme);
	const dispatch = useDispatch();
	//  ======================================== STATE
	const filters = useSelector(selectFilters);
	const collectionSummary = useSelector(selectCollectionSummary);

	//  ======================================== HANDLERS
	const expansionOptions = React.useMemo(
		() =>
			collectionSummary
				? Array.from(collectionSummary.expansions)
						.sort((a, b) => a.localeCompare(b))
						.map((expansion) => ({
							label: expansion.toUpperCase(),
							value: expansion.toUpperCase()
						}))
				: [],
		[collectionSummary]
	);
	const langOptions = React.useMemo(
		() =>
			collectionSummary
				? Array.from(collectionSummary.languages)
						.sort((a, b) => a.localeCompare(b))
						.map((lang) => ({ label: lang, value: lang }))
				: [],
		[collectionSummary]
	);

	const handleMinPriceAChange = (value: string) =>
		dispatch(filterSet({ filter: 'minEur', value }));
	const handleMinPriceBChange = (value: string) =>
		dispatch(filterSet({ filter: 'minUsd', value }));
	const handleMaxPriceAChange = (value: string) =>
		dispatch(filterSet({ filter: 'maxEur', value }));
	const handleMaxPriceBChange = (value: string) =>
		dispatch(filterSet({ filter: 'maxUsd', value }));
	const handleExpansionChange = ({ value }: { value: string }) =>
		dispatch(filterSet({ filter: 'expansion', value }));
	const handleLanguageChange = ({ value }: { value: string }) =>
		dispatch(filterSet({ filter: 'language', value }));
	const resetFilters = () => dispatch(filtersReset());
	// const handlePriceGroupChange = ({ value }: { value: string }) =>
	// 	dispatch(filterSet({ filter: 'priceGroup', value }));

	//  ======================================== EFFECTS
	//  ======================================== JSX
	return (
		<div
			aria-label='filter-section'
			className={clsx(
				isOpen ? 'flex content-start flex-wrap' : 'hidden'
			)}>
			{/* EXPANSION BASED SEARCH */}
			<div className='flex mb-1'>
				<div className='w-36'>
					<FilterInput id='expansion-filter' label='Expansion'>
						<Select
							defaultValue={DEFAULT_OPTION}
							value={{
								label: filters.expansion || 'All',
								value: filters.expansion
							}}
							options={[DEFAULT_OPTION, ...expansionOptions]}
							getOptionLabel={(expansion) => expansion.label}
							getOptionValue={(expansion) => expansion.value}
							onChange={handleExpansionChange}
							styles={customSelectStyles}
						/>
					</FilterInput>
				</div>
				<div className='w-36'>
					<FilterInput id='language-filter' label='Language'>
						<Select
							defaultValue={DEFAULT_OPTION}
							value={{
								label: filters.language || 'All',
								value: filters.language
							}}
							options={[DEFAULT_OPTION, ...langOptions]}
							getOptionLabel={(lang) => lang.label}
							getOptionValue={(lang) => lang.value}
							onChange={handleLanguageChange}
							styles={customSelectStyles}
						/>
					</FilterInput>
				</div>
			</div>

			<div className='flex mb-1'>
				<FilterInput id='min-value-input-a' label='Min Eur'>
					<NumInput
						className='h-10'
						value={filters.minEur}
						setValue={handleMinPriceAChange}
						id='min-value-input-a'
					/>
				</FilterInput>
				<FilterInput id='max-value-input-a' label='Max Eur'>
					<NumInput
						className='h-10'
						value={filters.maxEur}
						setValue={handleMaxPriceAChange}
						id='max-value-input-a'
					/>
				</FilterInput>
			</div>
			<div className='flex mb-1'>
				<FilterInput id='min-value-input-b' label='Min Usd'>
					<NumInput
						className='h-10'
						value={filters.minUsd}
						setValue={handleMinPriceBChange}
						id='min-value-input-b'
					/>
				</FilterInput>
				<FilterInput id='max-value-input-b' label='Max Usd'>
					<NumInput
						className='h-10'
						value={filters.maxUsd}
						setValue={handleMaxPriceBChange}
						id='max-value-input-b'
					/>
				</FilterInput>
			</div>
			<Button className='flex mb-1 self-end mr-3' onClick={resetFilters}>
				Reset
			</Button>
			<BulkAddButton className='flex mb-1 self-end'/>

			{/* <div className='w-36'>
				<FilterInput id='price-group-filter' label='Price Group'>
					<Select
						placeholder='Any'
						options={priceGroupOptions}
						getOptionLabel={(priceGroup) => priceGroup.label}
						getOptionValue={(priceGroup) => priceGroup.value}
						onChange={handlePriceGroupChange}
						styles={customSelectStyles}
					/>
				</FilterInput>
			</div> */}
		</div>
	);
};

//  ======================================== EXPORTS
export default FilterSection;
//  ========================================
