import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const RequireAuth = ({
	children,
	redirectTo = "/",
}) => {
	const { isAdmin } = useAuthContext()

	return (
		isAdmin
			? children
			: <Navigate to={redirectTo} />
	)
}

export default RequireAuth
