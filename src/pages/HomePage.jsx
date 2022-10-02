import Logo from '../assets/images/Logo.png'
import { Link } from 'react-router-dom'
import LinkToRestaurants from '../assets/images/link-to-restaurants.png'


const HomePage = () => {

	return (
		<div className="homepage">
			<img src={Logo} alt="logo" className='logo' /><br />
			<Link to={'/restaurants'}><img className='link-to-map' src={LinkToRestaurants} alt='link' /></Link>
		</div>
	)
}

export default HomePage
