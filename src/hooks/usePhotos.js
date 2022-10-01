import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where } from 'firebase/firestore'
import { db } from '../firebase'

const usePhotos = (id) => {
	// console.log(id)

	const collectionRef = collection(db, 'restaurants_images')

	const queryRef = query(collectionRef, where('restaurant_id', '==', id), where('approved', '==', true))

	const photosQuery = useFirestoreQueryData(['restaurants_images'], queryRef, {
		idField: 'id',
		subscribe: true,
	})

	return photosQuery
}

export default usePhotos
