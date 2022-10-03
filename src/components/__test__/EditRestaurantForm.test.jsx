import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditRestaurantForm from '../EditRestaurantForm'

it("the table name is not empty", () => {

	const restaurant = { name: 'test' }

	render(<EditRestaurantForm restaurant={restaurant} />)

	const inputElement = screen.getByLabelText(/name */i)

	expect(inputElement.value).not.toBe('')
})

it("when user tries to leave name field empty it returns the initial value", async () => {

	const restaurant = { name: 'test' }

	render(<EditRestaurantForm restaurant={restaurant} />)

	const inputElement = screen.getByLabelText(/name */i)
	const btnSubmit = screen.getByRole('button', { name: /submit/i })

	await userEvent.clear(inputElement)
	await userEvent.click(btnSubmit)

	expect(inputElement.value).toBe('test')
})


