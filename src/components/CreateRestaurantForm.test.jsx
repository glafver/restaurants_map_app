import { render, screen } from '@testing-library/react'
import { expect, it } from 'vitest'
import CreateRestaurantForm from './CreateRestaurantForm'


it('renders the input fields ', () => {
	// 1) Render the create restaurant component
	render(<CreateRestaurantForm />)


	// 2) Find the elements we are interacting with
	const restaurantName = screen.getByRole('textbox', {name: /name/i})
    

	// 3) Assert that the results are what we expect them to be
    expect(restaurantName).toBeInTheDocument()
})

