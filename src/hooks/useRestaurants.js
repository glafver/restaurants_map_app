import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query } from 'firebase/firestore'
import { db } from '../firebase'
import { useSearchParams } from 'react-router-dom'

const useRestaurants = () => {

	const [searchParams, setSearchParams] = useSearchParams()

	let params = {
		cuisine: searchParams.get('cuisine'),
		type: searchParams.get('type'),
		sort: searchParams.get('sort')
	}

	let queryRef = query(collection(db, 'restaurants'))

	const restaurantQuery = useFirestoreQueryData(['restaurants'], queryRef, {
		idField: 'id',
		subscribe: true,
	})

	if (params.cuisine || params.type || params.sort) {

		if (!restaurantQuery.data) {
			return
		}

		let restaurants = restaurantQuery.data

		if (params.cuisine) {
			restaurants = restaurants.filter(rest => {
				return rest.cuisine === params.cuisine
			})
		}

		if (params.type) {
			restaurants = restaurants.filter(rest => {
				return rest.type === params.type
			})
		}

		if (params.sort) {
			if (params.sort === 'asc') {
				restaurants.sort((a, b) => a.name.localeCompare(b.name))
			}
			if (params.sort === 'dec') {
				restaurants.sort((a, b) => b.name.localeCompare(a.name))
			}
		}

		return restaurants
	}

	return restaurantQuery.data
}

export default useRestaurants
