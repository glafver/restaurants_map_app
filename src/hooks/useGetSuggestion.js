import useStreamDocument from "./useStreamDocument"

const useGetSuggestion = (id) => {
	return useStreamDocument('suggestions', id)
}

export default useGetSuggestion
