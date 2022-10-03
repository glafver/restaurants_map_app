import { Card, Row, Image } from 'react-bootstrap'
import RestaurantImage from '../assets/images/restaurant_example.jpeg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faLocationDot, faCircleInfo, faRoute } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const RestaurantsList = ({ restaurants }) => {


    const getDirection = (geo) => {
        const googleLink = 'https://www.google.com/maps/dir/?api=1&destination=';
        const position = `${geo.lat},${geo.lng}`;
        const destinationToURL = encodeURIComponent(position);
        const destinantionLink = googleLink + destinationToURL;
        window.open(destinantionLink, '_blank')
    }

    return (

        <>
            <Row className="overflow-auto" style={{ height: "525px" }}>
                {restaurants && restaurants.map((restaurant, index) => (
                    <div className='col-12 d-flex flex-column flex-md-row' key={index}>
                        <Card className='restaurant-card col-12 col-md-6'>
                            <Card.Body className='card-body'>
                                <Card.Title className='restaurant-card-title'>{restaurant.name}</Card.Title>
                                <div>
                                    <p className='card-restaurant-info'> <FontAwesomeIcon className='card-icons' icon={faLocationDot} /> {restaurant.adress}</p>
                                    <p className='card-restaurant-info'><FontAwesomeIcon className='card-icons' icon={faUtensils} /> {restaurant.cuisine}</p>
                                    <p className='card-restaurant-info'><FontAwesomeIcon className='card-icons' icon={faCircleInfo} /><Link className='nav-color' to={`/restaurants/${restaurant.id}`}>More info</Link> </p>
                                    <Link className='nav-color direction-link' onClick={() => getDirection(restaurant.geolocation)}>Get direction</Link>
                                </div>
                            </Card.Body>
                            <Card.Footer className='card-footer'>
                                {restaurant.distance ? <> <FontAwesomeIcon className='card-icons' icon={faRoute} /> {restaurant.distance} m</>
                                    : ""}
                            </Card.Footer>
                        </Card>
                        <Image src={RestaurantImage} className='card-image fluid col-12 col-md-6' ></Image>
                    </div>

                ))}
            </Row>
        </>

    )
}

export default RestaurantsList