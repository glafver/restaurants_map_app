import { renderWithBrowserRouter, screen } from '../../utils/test-utils'
import { server } from '../../mocks/server'
import SuggestedRestaurantsPage from '../../pages/SuggestedRestaurantsPage'


// 🏎 Boot API mocking
beforeAll(() => server.listen())

// 🧨 Reset handlers (not need in our app though)
afterEach(() => server.resetHandlers())

// 🧹 Clean up after ourselves
afterAll(() => server.close())

test("can get at least one suggestions in the edit list", async () => {
    
	renderWithBrowserRouter()


	const listItemElements = await screen.findAllByRole('listitem')

	
	expect(listItemElements.length).toBeGreaterThanOrEqual(1)
})

test("can get at least two users", async () => {
	renderWithBrowserRouter(<SuggestedRestaurantsPage />)


	const listItemElements = await screen.findAllByRole('listitem')

	expect(listItemElements.length).toBeGreaterThanOrEqual(2)
})