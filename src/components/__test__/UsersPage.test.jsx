import { renderWithBrowserRouter, screen } from '../../utils/test-utils'
import { server } from '../../mocks/server'
import { expect, it } from 'vitest'
import UsersPage from '../../pages/UsersPage'

// 🏎 Boot API mocking
beforeAll(() => server.listen())

// 🧨 Reset handlers (not need in our app though)
afterEach(() => server.resetHandlers())

// 🧹 Clean up after ourselves
afterAll(() => server.close())

test('renders the input fields ', () => {

    // const { debug } = renderWithBrowserRouter(<UsersPage />)

    // console.log('first')

    // debug()

    // const makeAdminBtn = screen.getByRole('button', { name: /make admin/i })

    // expect(makeAdminBtn).toBeInTheDocument()
})