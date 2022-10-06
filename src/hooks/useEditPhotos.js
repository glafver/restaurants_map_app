import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, orderBy, query, where } from 'firebase/firestore'
import { db } from '../firebase'

const useEditPhotos = (id) => {

    const collectionRef = collection(db, 'restaurants_images')

    // where() + orderBy() don't want to work together
    const queryRef = query(collectionRef, where('restaurant_id', '==', id))

    const photosQuery = useFirestoreQueryData(['restaurants_images_edit', { restaurant: id }], queryRef, {
        idField: 'id',
        subscribe: true,
    })

    return photosQuery
}

export default useEditPhotos