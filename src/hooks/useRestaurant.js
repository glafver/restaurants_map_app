import useStreamDocument from "./useStreamDocument";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const useRestaurant = () => {
	// return useStreamDocument('restaurants', id)

	const getRestaurant = (id) => {
		return useStreamDocument("restaurants", id);
	};

	const deleteRestaurant = async (id) => {
		const docRef = doc(db, "restaurants", id);
		await deleteDoc(docRef);
	};

	return {
		getRestaurant,
		deleteRestaurant,
	};
};

export default useRestaurant;
