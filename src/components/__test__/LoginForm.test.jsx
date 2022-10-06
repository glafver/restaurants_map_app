// import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginPage from '../../pages/LoginPage'
import { renderWithBrowserRouter } from '../../utils/test-utils'
import { server } from '../../mocks/server'
import ReactDOM from 'react-dom/client';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react'

let container;

beforeAll(() => server.listen())

beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
});

// afterEach(() => server.resetHandlers())

afterEach(() => {
    document.body.removeChild(container);
    container = null;
    server.resetHandlers();
});

afterAll(() => server.close())

test("renders input field initially empty", () => {

    const { debug } = renderWithBrowserRouter(<LoginPage />)

    debug()


    // renderWithBrowserRouter(<LoginPage />)

    // find
    // const inputElement = screen.getByRole('textbox')

    // assert
    // expect(inputElement.value).toBe('')
})