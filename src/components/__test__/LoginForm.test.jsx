import { render, screen, waitFor} from '@testing-library/react'
import { expect, it } from 'vitest'
import LoginForm from '../LoginForm'
import userEvent from '@testing-library/user-event'
import jest from 'jest-mock';

//integration test

const onSubmit = jest.fn()

//render
beforeEach(()=>{
    const {  } = render(<LoginForm />)
    onSubmit.mockClear()
  })

it("check if login works correctly", async () => {

    onSubmit.mockImplementation(event => {
        event.preventDefault();
      });

    //find
    const loginEmail = screen.getByLabelText(/email/i);
    const loginPassword = screen.getByLabelText(/password/i)

    const form = screen.getByRole('form');

    form.onsubmit = onSubmit;
    
    const btnlogin = screen.getByRole('button', { name: /^Log in$/i })

    //type email
    await userEvent.type(loginEmail, '23wiktoria08@gmail.com')

    //type password
    await userEvent.type(loginPassword, 'wiktoria')

    //click submit button
    await userEvent.click(btnlogin)

    //assert 
    await waitFor(()=>{
        expect(onSubmit).toHaveBeenCalled()
    })

})