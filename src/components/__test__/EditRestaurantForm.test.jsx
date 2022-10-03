import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import EditRestaurantForm from '../EditRestaurantForm'

it("the table is not empty", () => {

	const restaurant = { name: 'test' }

	render(<EditRestaurantForm restaurant={restaurant} />)

	const inputElement = screen.getByLabelText(/name */i)
	// const restaurantName = screen.getByRole('textbox', { name: /name/i })
	console.log(inputElement)

	expect(inputElement.value).not.toBe('')
})


