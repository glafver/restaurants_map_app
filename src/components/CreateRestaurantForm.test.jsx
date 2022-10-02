import { render, screen } from '@testing-library/react'
import { click } from '@testing-library/user-event'
import { expect, it } from 'vitest'
import CreateRestaurantForm from './CreateRestaurantForm'

it('renders the input fields ', () => {
	// 1) Render the create restaurant component
	render(<CreateRestaurantForm />)

	// 2) Find the elements we are interacting with
	const restaurantName = screen.getByRole('textbox', {name: /name/i})
    const restaurantDescription = screen.getByRole('textbox', {name: /name/i})
    const restaurantCuisine = screen.getByRole('textbox', {name: /name/i})
    const restaurantType = screen.getByRole('textbox', {name: /name/i})
    const restaurantTelephone = screen.getByRole('textbox', {name: /name/i})
    const restaurantEmail = screen.getByRole('textbox', {name: /name/i})
    const restaurantWebsite = screen.getByRole('textbox', {name: /name/i})
    const restaurantFacebook = screen.getByRole('textbox', {name: /name/i})
    const restaurantInstagram = screen.getByRole('textbox', {name: /name/i})

	// 3) Assert that the results are what we expect them to be
    expect(restaurantName,restaurantDescription,restaurantCuisine,restaurantType,restaurantTelephone,restaurantEmail,restaurantWebsite,restaurantFacebook,restaurantInstagram).toBeInTheDocument()
})

