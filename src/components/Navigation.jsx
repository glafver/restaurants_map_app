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
					Tasty Malmö
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} to="/restaurants">Restaurants</Nav.Link>
						{currentUser
							?
							<>
								<Nav.Link as={NavLink} to="/suggest">Suggest</Nav.Link>
								<NavDropdown title={
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
							</>

							:
							<Nav.Link as={NavLink} to="/login">Login</Nav.Link>

						}


						{isAdmin &&
							<NavDropdown title="Admin">
								<NavLink to="/users" className="dropdown-item">Users</NavLink>
								<NavDropdown.Divider />
								<NavLink to="/create_restaurant" className="dropdown-item">Create restaurant</NavLink>
								<NavLink to="/suggestions" className="dropdown-item">Suggestions</NavLink>
								
							</NavDropdown>
						}

						{/* <Nav.Link as={NavLink} to="/restaurant/id">
							Restaurant
						</Nav.Link> */}
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation
