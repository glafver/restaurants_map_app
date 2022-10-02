import { Row, Col } from 'react-bootstrap'
import Map from '../components/Map'
import ListRestaurants from '../components/ListRestaurants'
import { collection, orderBy, query } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { db } from '../firebase'
import useRestaurants from '../hooks/useRestaurants'
import RestaurantsFilter from '../components/RestaurantsFilter'

const ListAndMap = () => {

	const restaurants = useRestaurants()

	// 	const queryRef = query(
	// 		collection(db, 'restaurants'),
	// 		orderBy('geolocation')
	// 	)
	//   const { data: restaurants, isLoading } = useFirestoreQueryData(['restaurants'], queryRef, {
	// 		idField: 'id',
	// 		subscribe: true,
	// 	})

	return (
		<div>
			<RestaurantsFilter></RestaurantsFilter>
			<Row>
				{restaurants && <Col className="pe-0" sm={3}><ListRestaurants restaurants={restaurants} /></Col>}
				{/* <Col className="ps-0" sm={9}><Map restaurants={restaurants} /></Col> */}
			</Row>

		</div>
	)
}

export default ListAndMap