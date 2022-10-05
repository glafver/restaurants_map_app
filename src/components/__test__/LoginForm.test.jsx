// import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from '../../pages/LoginPage'
import { renderWithBrowserRouter, screen } from '../../utils/test-utils'
import { server } from '../../mocks/server'

// 🏎 Boot API mocking
beforeAll(() => server.listen())

// 🧨 Reset handlers (not need in our app though)
afterEach(() => server.resetHandlers())

// 🧹 Clean up after ourselves
afterAll(() => server.close())

test("renders input field initially empty", () => {

    renderWithBrowserRouter(<LoginPage />)

    // find
    // const inputElement = screen.getByRole('textbox')

    // assert
    // expect(inputElement.value).toBe('')
})