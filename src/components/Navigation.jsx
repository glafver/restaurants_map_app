import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { NavDropdown, Image } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'

const Navigation = () => {

	const { currentUser, userName, userPhotoUrl, isAdmin } = useAuthContext()

	return (
		<Navbar variant="dark" expand="md" className='navbar'>
			<Container>
				<Navbar.Brand as={Link} to="/" className='nav-brand'>
					Tasty Malmö
				</Navbar.Brand>

				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav" className='nav-links'>
					<Nav className="ms-auto">
						<Nav.Link as={NavLink} to="/restaurants">Restaurants</Nav.Link>
						{!currentUser && !isAdmin &&
							<>
								<Nav.Link as={NavLink} to="/login">Login/Signup</Nav.Link>
							</>
						}
						{currentUser && !isAdmin &&
							<>
								<Nav.Link as={NavLink} to="/suggest">Suggest</Nav.Link>
								<NavDropdown title={
									<>
										<Image
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
						}


						{isAdmin &&
							<NavDropdown title={<><Image
								src={userPhotoUrl || 'https://www.salisburyut.com/wp-content/uploads/2020/09/avatar-1-scaled.jpeg'}
								height={30}
								width={30}
								fluid
								roundedCircle
							/> <span>{userName}</span></>}>
								<NavLink to="/users" className="dropdown-item">Users</NavLink>
								<NavDropdown.Divider />
								<NavLink to="/edit_restaurants" className="dropdown-item ">Edit restaurants</NavLink>
								<NavLink to="/create_restaurant" className="dropdown-item">Create restaurant</NavLink>
								<NavLink to="/suggestions" className="dropdown-item">Suggestions</NavLink>
								<NavDropdown.Divider />
								<NavLink to="/update-profile" className="dropdown-item">Update Profile</NavLink>
								<NavLink to="/logout" className="dropdown-item">Log Out</NavLink>

							</NavDropdown>
						}


					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Navigation
