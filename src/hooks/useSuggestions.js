import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query } from "firebase/firestore";
import { db } from "../firebase";

const useSuggestions = () => {
	const queryRef = query(collection(db, "suggestions"));

	const usersQuery = useFirestoreQueryData(["suggestions"], queryRef, {
		idField: "id",
		subscribe: true,
	});

	return usersQuery;
};

export default useSuggestions;
