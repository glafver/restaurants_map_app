import { Card, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import usePosition from '../hooks/usePosition'
import getDistance from 'geolib/es/getPreciseDistance'
import { useEffect } from 'react'

const RestaurantsList = ({ restaurants }) => {

    const position = usePosition()

    const getDirection = (geo) => {
        const googleLink = 'https://www.google.com/maps/dir/?api=1&destination=';
        const position = `${geo.lat},${geo.lng}`;
        const destinationToURL = encodeURIComponent(position);
        const destinantionLink = googleLink + destinationToURL;
        window.open(destinantionLink, '_blank')
    }

    useEffect(() => {

        if (restaurants && position.latitude) {
            restaurants.forEach(data => {
                let distance = getDistance(
                    { latitude: data.geolocation.lat, longitude: data.geolocation.lat },
                    { latitude: position.latitude, longitude: position.latitude }
                )
                data.distance = distance
            });
        }

    }, [restaurants, position])

    return (

        <>
            <Row className="overflow-auto" style={{ height: "600px" }}>
                {restaurants && restaurants.map(restaurant => (
                    <Col className='col-12' key={restaurant.id}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{restaurant.name}</Card.Title>
                                <Card.Text>
                                    {restaurant.description}

                                </Card.Text>
                                <Card.Text>
                                    {restaurant.distance}

                                </Card.Text>
                                <Link className='nav-color direction-link' onClick={() => getDirection(restaurant.geolocation)}>Get direction</Link>
                                <br />
                                <Button className="mb-4" variant="secondary" as={Link} to={`/restaurants/${restaurant.id}`}>More about restaurant...</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>



        </>

    )
}

export default RestaurantsList