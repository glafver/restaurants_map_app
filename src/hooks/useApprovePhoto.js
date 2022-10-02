import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../firebase'

const useApprovePhoto = () => {

    const approve = async (id) => {
        console.log(id)
        // return
        const docRef = doc(db, 'restaurants_images', id)
        await updateDoc(docRef, {
            approved: true
        })
    }

    return { approve }

}

export default useApprovePhoto