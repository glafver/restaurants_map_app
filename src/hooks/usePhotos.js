import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { db } from "../firebase";

const usePhotos = (id) => {
	const collectionRef = collection(db, "restaurants_images");

	// where() + orderBy() don't want to work together
	const queryRef = query(
		collectionRef,
		where("restaurant_id", "==", id),
		where("approved", "==", true)
	);

	const photosQuery = useFirestoreQueryData(
		["restaurants_images", { restaurant: id }],
		queryRef,
		{
			idField: "id",
			subscribe: true,
		}
	);

	return photosQuery;
};

export default usePhotos;
