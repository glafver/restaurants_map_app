import { render, screen} from '@testing-library/react'
import { expect, it } from 'vitest'
import CreateRestaurantForm from '../CreateRestaurantForm'
import userEvent from '@testing-library/user-event'


it('renders the input fields ', () => {
	// 1) Render the create restaurant component
	render(<CreateRestaurantForm />)


	// 2) Find the elements we are interacting with
	const restaurantName = screen.getByRole('textbox', { name: /name/i })


	// 3) Assert that the results are what we expect them to be
	expect(restaurantName).toBeInTheDocument()
})


it('renders the input fields empty ', () => {
	// 1) Render the create restaurant component
	render(<CreateRestaurantForm />)


	// 2) Find the elements we are interacting with
	const restaurantName = screen.getByRole('textbox', { name: /name/i })


	// 3) Assert that the results are what we expect them to be
	expect(restaurantName.value).toBe("")
})

it('renders the submit button', () => {
	// 1) Render the create restaurant component
	render(<CreateRestaurantForm />)
	// 2) Find the elements we are interacting with
	const submitButton = screen.getByRole('button')
	// 3) Assert that the results are what we expect them to b
	expect(submitButton).toBeInTheDocument()

})



// INTEGRATION TESTS


it("renders input field initially empty", () => {
	// render
	render(<CreateRestaurantForm />)

	// find
	const input = screen.getAllByRole('textbox')

	// assert
	expect(input.value).toBe(undefined)
})

it("can type into input field", async () => {
	// render
	render(<CreateRestaurantForm />)

	// find
	const input = screen.getByRole('textbox', {name: /name/i})

	// interact
	await userEvent.type(input, 'Wiktoria')

	// assert
	expect(input.value).toBe('Wiktoria')
})

it("check if inputs in the forms works correctly", async () => {
	// render
	render(<CreateRestaurantForm />)

	// find
	const inputName = screen.getByRole('textbox', {name: /name/i})
	const inputDescription = screen.getByRole('textbox', {name: /description/i})
	const comboboxCuisine = screen.getByRole('combobox', {name: /cuisine/i})
	const comboboxType = screen.getByRole('combobox', {name: /type/i})

	// interact
	await userEvent.type(inputName, 'Wiktoria')
	await userEvent.type(inputDescription, "Best restaurant")
	await userEvent.selectOptions(comboboxCuisine, "Polish")
	await userEvent.selectOptions(comboboxType, "Fine dining")

	// assert
	expect(inputName.value).toBe('Wiktoria')
	expect(inputDescription.value).toBe('Best restaurant')
	expect(comboboxType).toHaveValue("Fine dining")
	expect(comboboxCuisine).toHaveValue("Polish")
})


