import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavDropdown, Image } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const Navigation = () => {

	const { currentUser, userName, userPhotoUrl, isAdmin } = useAuthContext()

	return (
		<Navbar bg="dark" variant="dark" expand="md">
			<Container>
				<Navbar.Brand as={Link} to="/">
					React Template
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						{/* <Nav.Link as={NavLink} end to="/">Home</Nav.Link> */}
						{currentUser
							? <NavDropdown title={
								<><Image
									src={userPhotoUrl || 'https://www.salisburyut.com/wp-content/uploads/2020/09/avatar-1-scaled.jpeg'}
									height={30}
									width={30}
									fluid
									roundedCircle
								/> <span>{userName}</span></>
							}>
								<NavLink to="/update-profile" className="dropdown-item">Update Profile</NavLink>
								<NavDropdown.Divider />
								<NavLink to="/logout" className="dropdown-item">Log Out</NavLink>
							</NavDropdown>
							: <Nav.Link as={NavLink} to="/login">Login</Nav.Link>}

						{isAdmin &&
							<NavDropdown title="Admin">
								<NavLink to="/users" className="dropdown-item">Users</NavLink>
								<NavDropdown.Divider />
								<NavLink to="/restaurants" className="dropdown-item">Restaurants</NavLink>
							</NavDropdown>
						}

						<Nav.Link as={NavLink} to="/suggest">
							Suggest
						</Nav.Link>
						<Nav.Link as={NavLink} to="/restaurant/id">
							Restaurant
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation
