import Container from 'react-bootstrap/Container'
import { useAuthContext } from '../contexts/AuthContext'

const HomePage = () => {

	const { isAdmin } = useAuthContext()

	return (
		<Container className="py-3">
			<h1>Welcome {isAdmin && 'admin'}!</h1>
		</Container>
	)
}

export default HomePage
