import { useFirestoreQueryData } from '@react-query-firebase/firestore'
import { collection, query, where } from 'firebase/firestore'
import { db } from '../firebase'

const useEditPhotos = (id) => {
    // console.log(id)

    const collectionRef = collection(db, 'restaurants_images')

    const queryRef = query(collectionRef, where('restaurant_id', '==', id))

    const photosQuery = useFirestoreQueryData(['restaurants_images'], queryRef, {
        idField: 'id',
        subscribe: true,
    })

    return photosQuery
}

export default useEditPhotos