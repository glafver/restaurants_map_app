import {Row, Col} from 'react-bootstrap'
// import { useAuthContext } from '../contexts/AuthContext'
import Map from '../components/Map'
import ListRestaurants from '../components/ListRestaurants'
import { collection, orderBy, query } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { db } from '../firebase'

const HomePage = () => {

	const queryRef = query(
		collection(db, 'restaurants'),
		orderBy('geolocation')
	)
  const { data: restaurants, isLoading } = useFirestoreQueryData(['restaurants'], queryRef, {
		idField: 'id',
		subscribe: true,
	})

	// const { isAdmin } = useAuthContext()

	return (
		<div className="">
			<Row>
			{!isLoading && <Col className="pe-0" sm={3}><ListRestaurants restaurants={restaurants}/></Col> }
			<Col className="ps-0" sm={9}><Map /></Col>
			</Row>
			
		</div>
	)
}

export default HomePage
