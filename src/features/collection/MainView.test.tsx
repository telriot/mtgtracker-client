import {fireEvent, render, screen} from 'common/utils/test-utils'

import MainView from './MainView'
import {generateCardMock} from '../../mocks/data'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

const server = setupServer(
    // Describe the requests to mock.
    rest.get('/book/:bookId', (req, res, ctx) => {
      return res(
        ctx.json({
          title: 'Lord of the Rings',
          author: 'J. R. R. Tolkien',
        }),
      )
    }),
  )
describe('Renders correctly', () => {
    test('Renders correct data', async () => {
        render(<MainView/>)
    })
})