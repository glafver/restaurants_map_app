import { useState } from 'react'
import { doc, deleteDoc } from 'firebase/firestore'
import { ref, deleteObject } from 'firebase/storage'
import { db, storage } from '../firebase'
import { toast } from 'react-toastify'

const useDeletePhoto = () => {
    const [error, setError] = useState(null)
    const [deleting, setDeleting] = useState(false)

    const deletePhoto = async (photo) => {
        setDeleting(true)
        setError(null)

        try {

            const storageRef = ref(storage, photo.path)

            await deleteObject(storageRef)

            const dbRef = doc(db, 'restaurants_images', photo.id)

            await deleteDoc(dbRef)

        } catch (e) {
            setError(e)
            toast.error(e.message)
        } finally {
            setDeleting(false)
        }


    }

    return {
        deletePhoto,
        error,
        deleting
    }
}

export default useDeletePhoto