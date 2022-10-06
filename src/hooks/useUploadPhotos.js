import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { useAuthContext } from "../contexts/AuthContext";
import { db, storage } from "../firebase";

const useUploadPhotos = () => {
	const [error, setError] = useState(null);
	const [isError, setIsError] = useState(null);
	const [isSuccess, setIsSuccess] = useState(null);
	const [isUploading, setIsUploading] = useState(null);
	const [progress, setProgress] = useState(null);

	const { currentUser, isAdmin } = useAuthContext();

	const upload = async (image, restaurant_id) => {
		setError(null);
		setIsError(null);
		setIsSuccess(null);
		setIsUploading(true);

		try {
			const uuid = uuidv4();

			const ext = image.name.substring(image.name.lastIndexOf(".") + 1);

			const storageFilename = `${uuid}.${ext}`;

			const storageRef = ref(
				storage,
				`restaurants/${restaurant_id}/${storageFilename}`
			);

			const uploadTask = uploadBytesResumable(storageRef, image);

			uploadTask.on("state_changed", (uploadTaskSnapshot) => {
				setProgress(
					Math.round(
						(uploadTaskSnapshot.bytesTransferred /
							uploadTaskSnapshot.totalBytes) *
							1000
					) / 10
				);
			});

			await uploadTask.then();

			const url = await getDownloadURL(storageRef);

			const collectionRef = collection(db, "restaurants_images");

			await addDoc(collectionRef, {
				created: serverTimestamp(),
				name: image.name,
				restaurant_id,
				approved: isAdmin,
				path: storageRef.fullPath,
				type: image.type,
				size: image.size,
				user: currentUser.uid,
				url,
			});
			setProgress(null);
			setIsSuccess(true);
		} catch (e) {
			setError(e);
			setIsError(true);
		} finally {
			setIsUploading(false);
		}
	};

	return {
		error,
		isError,
		isSuccess,
		isUploading,
		progress,
		upload,
	};
};

export default useUploadPhotos;
