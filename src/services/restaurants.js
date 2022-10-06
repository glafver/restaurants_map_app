import axios from 'axios'

const BASE_URL = 'http://localhost:3000/suggestions/'

const get = async (endpoint) => {
	const res = await axios.get(BASE_URL + endpoint)
	return res.data
}

const getSuggestions = () => {
	return get()
}

export {
	getSuggestions,
}