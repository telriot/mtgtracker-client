import { render, screen } from 'common/utils/test-utils';
import CollectionSummary from './CollectionSummary';
import {collectionSummaryMock} from 'mocks/data'



describe('Renders correctly', () => {
	test('Renders loading indicator if summary is not loaded', async () => {
		render(<CollectionSummary summary={{...collectionSummaryMock, isLoaded:false}}/>);
        expect(screen.getByLabelText('loading-indicator')).toBeInTheDocument
	});
    test('Renders correct data if summary is loaded', async () => {
		render(<CollectionSummary summary={{...collectionSummaryMock}}/>);
        expect(screen.findByLabelText('loading-indicator')).not.toBeInTheDocument
        expect(screen.getByLabelText('cards-total-quantity')).toHaveTextContent(collectionSummaryMock.cardsQuantity.toString())
        expect(screen.getByLabelText('cards-total-usd')).toHaveTextContent(collectionSummaryMock.totalUsd.toString())
        expect(screen.getByLabelText('cards-total-eur')).toHaveTextContent(collectionSummaryMock.totalUsd.toString())
	});
});
