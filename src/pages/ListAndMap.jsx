import {Row, Col} from 'react-bootstrap'
import Map from '../components/Map'
import ListRestaurants from '../components/ListRestaurants'
import { collection, orderBy, query } from 'firebase/firestore'
import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { db } from '../firebase'

const ListAndMap = () => {


	const queryRef = query(
		collection(db, 'restaurants'),
		orderBy('geolocation')
	)
  const { data: restaurants, isLoading } = useFirestoreQueryData(['restaurants'], queryRef, {
		idField: 'id',
		subscribe: true,
	})

    return (
		<div>
			<Row>
			{!isLoading && <Col className="pe-0" sm={3}><ListRestaurants restaurants={restaurants}/></Col> }
			<Col className="ps-0" sm={9}><Map /></Col>
			</Row>
			
		</div>
	)
}

export default ListAndMap