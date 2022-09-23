import { collection, doc, getDoc } from 'firebase/firestore'
import { useFirestoreDocument } from "@react-query-firebase/firestore"
import { db } from '../firebase'
import { useParams } from "react-router-dom"

const useRestaurant = async () => {

	const { id } = useParams()
	console.log(id)

	// const collectionRef = collection(db, "restaurants");
	// const ref = doc(collectionRef, id);

	const dbRef = doc(db, 'restaurants', id)

	const docSnap = await getDoc(dbRef)

	// const product = useFirestoreDocument(["restaurant", '1'], dbRef)

	// const snapshot = product.data;
	console.log(docSnap.data())

	return docSnap
}

export default useRestaurant
