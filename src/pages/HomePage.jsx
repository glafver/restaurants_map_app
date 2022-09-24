import Container from 'react-bootstrap/Container'
import { useAuthContext } from '../contexts/AuthContext'
import Map from '../components/Map'

const HomePage = () => {

	const { isAdmin } = useAuthContext()

	return (
		<Container className="py-3">
			<h1>Welcome {isAdmin && 'admin'}!</h1>
			{/* <Map /> */}
		</Container>
	)
}

export default HomePage
