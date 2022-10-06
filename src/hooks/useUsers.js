import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { collection, query } from "firebase/firestore";
import { db } from "../firebase";

const useUsers = () => {
	const queryRef = query(collection(db, "users"));

	const usersQuery = useFirestoreQueryData(["users"], queryRef, {
		idField: "id",
		subscribe: true,
	});

	return usersQuery;
};

export default useUsers;
