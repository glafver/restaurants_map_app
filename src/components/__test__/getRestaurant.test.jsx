import { renderWithBrowserRouter, screen } from '../../utils/test-utils'
import { server } from '../../mocks/server'
import SuggestedRestaurantsPage from '../../pages/SuggestedRestaurantsPage'
import jest from 'jest-mock'

const mockedRestaurants = [
	{

		adress: "Malmö centralstation, Malmö, Sweden",
		cuisine: "Indian",
		description: "Indian restaurant with traditional indian food.",
		e_mail: "kali@mali.se",
		fb: "www.facebook.com",
		geolocation: {
			lat: 55.60906689999999,
			lng: 12.9999228,
		},
		insta: "www.instagram.com",
		name: "Kali Mali",
		tel: "+46888464565",
		type: "Fine dining",
		web_site: "www.km.lol"
	},
	{
		adress: "Test Adress",
		cuisine: "Test Cuisine",
		description: "Test Descr.",
		e_mail: "testEmail",
		fb: "testFB",
		geolocation: {
			lat: 55.60906689999999,
			lng: 12.9999228,
		},
		insta: "testig.com",
		name: "testName",
		tel: "Test Tel",
		type: "Test type",
		web_site: "test-site"
	}
]


// 🏎 Boot API mocking
beforeAll(() => server.listen())

// 🧨 Reset handlers (not need in our app though)
afterEach(() => server.resetHandlers())

// 🧹 Clean up after ourselves
afterAll(() => server.close())

// test("can get at least one suggestions in the edit list", async () => {

// 	renderWithBrowserRouter()


// 	const listItemElements = await screen.findAllByRole('listitem')


// 	expect(listItemElements.length).toBeGreaterThanOrEqual(1)
// })



test("can get at least two users", async () => {

	// jest.mock('@react-query-firebase/firestore', () => ({
	// 	useFirestoreQueryData: jest.fn().mockReturnValue(({ data: { ...mockedRestaurants }, isLoading: false, error: {} }))
	// }));

	const { debug } = renderWithBrowserRouter(<SuggestedRestaurantsPage />)

	debug()

	// const listItemElements = await screen.findAllByRole('listitem')

	// expect(listItemElements.length).toBeGreaterThanOrEqual(2)
})