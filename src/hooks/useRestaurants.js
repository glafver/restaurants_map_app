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

	const collectionRef = collection(db, 'restaurants')

	const queryRef = query(collectionRef, where('cuisine', '==', params.cuisine), where('approved', '==', true))
	// let queryRef = query(collection(db, 'restaurants'))

	const restaurantQuery = useFirestoreQueryData(['restaurants'], queryRef, {
		idField: 'id',
		subscribe: true,
	})

	if (params.cuisine || params.type || params.sort) {

		// if (!restaurantQuery.data) {
		// 	return
		// }

		// let restaurants = restaurantQuery.data

		if (params.cuisine) {
			// restaurants = restaurants.filter(rest => {
			// 	return rest.cuisine === params.cuisine
			// })
			queryRef = query(collectionRef, where('cuisine', '==', params.cuisine))
		}

		if (params.type) {
			// restaurants = restaurants.filter(rest => {
			// 	return rest.type === params.type
			// })
			queryRef = query(collectionRef, where('type', '==', params.type))
		}

		if (params.sort) {
			if (params.sort === 'asc') {
				// restaurants.sort((a, b) => a.name.localeCompare(b.name))
				queryRef = query(collectionRef, orderBy('created', 'asc'))
			}
			if (params.sort === 'dec') {
				// restaurants.sort((a, b) => b.name.localeCompare(a.name))
				queryRef = query(collectionRef, orderBy('created', 'decs'))
			}
		}

		return restaurants
	} else {
		queryRef = query(collection(db, 'restaurants'))
	}

	return restaurantQuery.data
}

export default useRestaurants
