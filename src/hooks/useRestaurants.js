import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query } from 'firebase/firestore'
import { db } from '../firebase'

const useRestaurants = () => {

	const queryRef = query(collection(db, 'restaurants'))

	const usersQuery = useFirestoreQueryData(['restaurants'], queryRef, {
		idField: 'id',
		subscribe: true,
	})

	return usersQuery
}

export default useRestaurants
