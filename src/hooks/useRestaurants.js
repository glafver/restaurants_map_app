import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, orderBy } from 'firebase/firestore'
import { db } from '../firebase'
import { useSearchParams } from 'react-router-dom'
import usePosition from './usePosition'
import getDistance from 'geolib/es/getPreciseDistance'

const useRestaurants = () => {

	const [searchParams, setSearchParams] = useSearchParams()
	const position = usePosition()

	let params = {
		cuisine: searchParams.get('cuisine'),
		type: searchParams.get('type'),
		sort: searchParams.get('sort')
	}

	// Unfortunately, it was not possible to combine where() and orderBy() in any way, 
	// they simply did not want to work together and response with any data (but they worked perfectly separaately), so I had to write work around.

	let queryRef = query(collection(db, 'restaurants'), orderBy("name", "asc"))

	const restaurantQuery = useFirestoreQueryData(['restaurants'], queryRef, {
		idField: 'id',
		subscribe: true,
	})

	let restaurantsData

	if (restaurantQuery.data) {

		if (position.latitude) {

			restaurantQuery.data.forEach(data => {

				let distance = getDistance(
					{ latitude: data.geolocation.lat, longitude: data.geolocation.lat },
					{ latitude: position.latitude, longitude: position.latitude }
				)
				data.distance = distance
			})
		} else {
			restaurantQuery.data.forEach(data => { data.distance = '' })
		}

		if (params.cuisine || params.type || params.sort) {

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

			if (params.sort && position.latitude) {
				if (params.sort === 'asc') {
					restaurants.sort((a, b) => a.distance - b.distance)
				}
				if (params.sort === 'desc') {
					restaurants.sort((a, b) => b.distance - a.distance)
				}
			}

			restaurantsData = restaurants
		} else {
			restaurantsData = restaurantQuery.data
		}
	}

	return restaurantsData
}

export default useRestaurants
