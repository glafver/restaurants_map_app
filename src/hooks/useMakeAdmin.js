import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

const useMakeAdmin = async (uid) => {
	const docRef = doc(db, "users", uid);
	await updateDoc(docRef, {
		isAdmin: true,
	});
};

export default useMakeAdmin;
