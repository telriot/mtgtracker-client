import {
	fireEvent,
	render,
	screen,
	waitFor,
	waitForElementToBeRemoved
} from 'common/utils/test-utils';
import MainView from './MainView';
import { generateServerSideCollection } from '../../mocks/data';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { collectionSummaryMock } from '../../mocks/data';
import { SERVER_API } from 'api';

const collection = generateServerSideCollection(20);
test('Render loading indicator on start', () => {
	render(<MainView />);
	expect(screen.getByLabelText('loading-indicator')).toBeInTheDocument;
});

describe('Renders correctly on loaded data', () => {
	const server = setupServer(
		rest.get(`${SERVER_API}/collections/:id/summary`, (req, res, ctx) => {
			return res(
				ctx.json({
					summary: { ...collectionSummaryMock, isLoaded: true }
				})
			);
		}),
		rest.get(`${SERVER_API}/collections/:id/cards`, (req, res, ctx) => {
			return res(
				ctx.json({
					cards: { docs: collection, totalPages: 5 }
				})
			);
		})
	);
	beforeEach(async () => {
		await server.listen();
		render(<MainView />);
	});
	afterEach(async () => {
		await server.close();
	});

	test('Renders correct data upon loading', async () => {
		await waitForElementToBeRemoved(() =>
			screen.getByLabelText('loading-indicator')
		);
		expect(screen.getByLabelText('collection-summary')).toBeInTheDocument;
		expect(screen.getByLabelText('toolbar')).toBeInTheDocument;
		await waitFor(
			() => expect(screen.getByText(collection[0].name)).toBeInTheDocument
		);
		expect(screen.getAllByLabelText('collection-card')).toHaveLength(20);
		expect(screen.getByLabelText('pagination')).toBeInTheDocument;
	});

	test('Opens create modal on add button click', async () => {
		await waitFor(
			() => expect(screen.getByText(collection[0].name)).toBeInTheDocument
		);
    const createModal = screen.queryByLabelText('create-modal')
		expect(createModal).not.toBeInTheDocument;
		fireEvent.click(screen.getByText('Add'));
		expect(createModal).toBeInTheDocument;
		fireEvent.click(screen.getByText('Cancel'));
    expect(createModal).not.toBeInTheDocument;
	});
	test('Opens edit modal on edit button click', async () => {
		await waitFor(
			() => expect(screen.getByText(collection[0].name)).toBeInTheDocument
		);
    const editModal = screen.queryByLabelText('edit-modal')
		expect(editModal).not.toBeInTheDocument;
		fireEvent.click(screen.getAllByLabelText('expand-button')[0]);
		fireEvent.click(screen.getAllByLabelText('edit-button')[0]);
		expect(editModal).toBeInTheDocument;
		fireEvent.click(screen.getByText('Cancel'));
    expect(editModal).not.toBeInTheDocument;

	});
	test('Opens delete modal on delete button click', async () => {
		await waitFor(
			() => expect(screen.getByText(collection[0].name)).toBeInTheDocument
		);
    const deleteModal = screen.queryByLabelText('delete-modal')

		expect(deleteModal).not.toBeInTheDocument;
		fireEvent.click(screen.getAllByLabelText('expand-button')[0]);
		fireEvent.click(screen.getAllByLabelText('delete-button')[0]);
		expect(deleteModal).toBeInTheDocument;
		fireEvent.click(screen.getByText('Cancel'));
    expect(deleteModal).not.toBeInTheDocument;

	});
});
