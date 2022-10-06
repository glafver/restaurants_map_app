import { rest } from 'msw'

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
// export const handlers = [
// 	rest.get('https://fed21-grupp-9.firebaseio.com/suggestions.json?', (req, res, ctx) => {
// 		return res(
// 			ctx.json({
// 				results: mockedRestaurants,
// 			})
// 		)
// 	}),
// ]

export const handlers = [
	rest.get('http://https://firestore.googleapis.com/v1/projects/fed21-grupp-9/', (req, res, ctx) => {
		return res(
			ctx.json({
				results: mockedRestaurants,
			})
		)
	}),
]