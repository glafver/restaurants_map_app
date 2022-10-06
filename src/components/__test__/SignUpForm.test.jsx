import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import jest from 'jest-mock';
import SignUpForm from '../SignupForm'

const onSubmit = jest.fn()

beforeEach(() => {
    onSubmit.mockClear()
})

it("renders form initially empty", () => {

    const { debug } = render(<SignUpForm />)

    // debug()

    const usernameInputElement = screen.getByLabelText('Username')
    const emailInputElement = screen.getByLabelText('Email')
    const photoInputElement = screen.getByLabelText('Photo')
    const passwordInputElement = screen.getByLabelText('Password')
    const passwordConfirmInputElement = screen.getByLabelText('Password Confirmation')

    expect(usernameInputElement.value).toBe('')
    expect(emailInputElement.value).toBe('')
    expect(photoInputElement.value).toBe('')
    expect(passwordInputElement.value).toBe('')
    expect(passwordConfirmInputElement.value).toBe('')
})



it("check if user can sign up", async () => {
    onSubmit.mockImplementation(event => {
        event.preventDefault();
    });

    const { debug } = render(<SignUpForm />)

    // debug()

    const usernameInputElement = screen.getByLabelText('Username')
    const emailInputElement = screen.getByLabelText('Email')
    const passwordInputElement = screen.getByLabelText('Password')
    const passwordConfirmInputElement = screen.getByLabelText('Password Confirmation')

    const form = screen.getByRole('form')
    form.onsubmit = onSubmit

    const signupBtn = screen.getByRole('button', { name: 'Create Account' })

    await userEvent.type(usernameInputElement, 'test@test.com')
    await userEvent.type(emailInputElement, 'test@test.com')
    await userEvent.type(passwordInputElement, 'test@test.com')
    await userEvent.type(passwordConfirmInputElement, 'test@test.com')
    await userEvent.click(signupBtn)

    await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled()
    })
})

it("check if passwords are not the same", async () => {
    onSubmit.mockImplementation(event => {
        event.preventDefault();
    });

    const { debug } = render(<SignUpForm />)

    // debug()

    const usernameInputElement = screen.getByLabelText('Username')
    const emailInputElement = screen.getByLabelText('Email')
    const passwordInputElement = screen.getByLabelText('Password')
    const passwordConfirmInputElement = screen.getByLabelText('Password Confirmation')

    const form = screen.getByRole('form')
    form.onsubmit = onSubmit

    const signupBtn = screen.getByRole('button', { name: 'Create Account' })

    await userEvent.type(usernameInputElement, 'test@test.com')
    await userEvent.type(emailInputElement, 'test@test.com')
    await userEvent.type(passwordInputElement, 'test@test.com')
    await userEvent.type(passwordConfirmInputElement, 'test2@test.com')
    await userEvent.click(signupBtn)

    const errorPasswords = screen.getByText('The passwords does not match')

    expect(errorPasswords).toBeInTheDocument()

})