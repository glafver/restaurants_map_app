import { Card, Row, Col, Button, Image } from 'react-bootstrap'
// import { Link } from 'react-router-dom'
// import usePosition from '../hooks/usePosition'
// import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useState, useEffect } from 'react'
import RestaurantImage from '../assets/images/restaurant_example.jpeg'
import { getDistance } from 'geolib';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUtensils, faLocationDot, faCircleInfo, faRoute } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const RestaurantsList = ({ restaurants }) => {

    // const position = usePosition()

    const getDirection = (geo) => {
        const googleLink = 'https://www.google.com/maps/dir/?api=1&destination=';
        const position = `${geo.lat},${geo.lng}`;
        const destinationToURL = encodeURIComponent(position);
        const destinantionLink = googleLink + destinationToURL;
        window.open(destinantionLink, '_blank')
    }

    return (

        <>
            <Row className="overflow-auto" style={{ height: "600px" }}>
                {restaurants && restaurants.map((restaurant, index) => (

                    <div className='col-12 d-flex' key={index}>
                        <Card className='restaurant-card col-6 mb-2'>
                            {/* <Card.Img variant="top" src={RestaurantImage} /> */}
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
                        <Image src={RestaurantImage} className='card-image fluid col-6 mb-2' ></Image>
                    </div>

                ))}
            </Row>
        </>

    )
}

export default RestaurantsList