import { rest } from 'msw'

const users = [
	{
		email: "test@test.com",
		isAdmin: false,
		name: "Test1",
		photoURL: null,
	},
	{
		email: "test@test.com",
		isAdmin: false,
		name: "Test2",
		photoURL: null,
	}
]

export const handlers = [

	rest.get('https://fed21-grupp-9.firebaseio.com/users', (req, res, ctx) => {
		return res(
			ctx.json({
				results: users,
			})
		)
	}),
]
