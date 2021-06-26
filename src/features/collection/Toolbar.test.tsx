import React from 'react'
import {
	fireEvent,
	render,
	screen,
	waitFor,
} from 'common/utils/test-utils';
import Toolbar from './Toolbar';
import { setupServer } from 'msw/node';
import { rest } from 'msw';
import { collectionSummaryMock } from '../../mocks/data';
import { SERVER_API } from 'api';

describe('Renders correctly on loaded data', () => {
	const server = setupServer(
		rest.get(`${SERVER_API}/collections/:id/summary`, (req, res, ctx) => {
			return res(
				ctx.json({
					summary: { ...collectionSummaryMock, isLoaded: true }
				})
			);
		})
	);
	beforeEach(async () => {
		await server.listen();
		render(<Toolbar />);
	});
	afterEach(async () => {
		await server.close();
	});

	test('Filter section can be toggled', async () => {
		await waitFor(()=>expect(screen.queryByLabelText('total-quantity')).toBeInTheDocument)
        const filterSection = screen.getByLabelText('filter-section')
        const toggleBtn = screen.getByLabelText('filters-toggle-button')
        expect(filterSection.className).toBe('hidden')
        fireEvent.click(toggleBtn)
        expect(filterSection.className).not.toBe('hidden')
        fireEvent.click(toggleBtn)
        expect(filterSection.className).toBe('hidden')
    });
});
