import Logo from '../assets/images/Logo.png'
import { Link } from 'react-router-dom'


const HomePage = () => {

	return (
		<div className="homepage">
			<img src={Logo} alt="logo" className='logo'/><br/>
			<Link className='link-to-map' to={'/map'}>Show restaurants near me</Link>
		</div>
	)
}

export default HomePage
