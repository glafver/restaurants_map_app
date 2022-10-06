import { rest } from 'msw'

const mockedUsers = [
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
export const handlers = [
	rest.get('http://localhost:3000/suggestions', (req, res, ctx) => {
		return res(
			ctx.json({
				results: mockedUsers,
			})
		)
	}),
]