import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import UsersPage from '../../pages/UsersPage'
// import "@testing-library/jest-dom"
// import { jest } from '@jest/globals'

const users = [
    {
        email: "test@test.com",
        isAdmin: false,
        name: "Test",
        photoURL: null,
    }
]

it('renders the UsersPage', () => {

    // jest.mock('react-query', () => ({
    //     useQuery: jest.fn().mockReturnValue(({ data: { ...users }, isLoading: false, error: {} }))
    // }));

    // const { debug } = render(<UsersPage />)

    // debug()

    // console.log('first')

    // const makeAdminBtn = screen.getByRole('button', { name: /make admin/i })

    // expect(makeAdminBtn).toBeInTheDocument()
})