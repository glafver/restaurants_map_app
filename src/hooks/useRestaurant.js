import useStreamDocument from "./useStreamDocument"

const useRestaurant = (id) => {
    return useStreamDocument('restaurants', id)
}

export default useRestaurant