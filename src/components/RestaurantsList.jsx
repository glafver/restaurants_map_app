import { Card, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import RestaurantsFilter from './RestaurantsFilter'
import { useFilterContext } from '../contexts/FilterContext'

const RestaurantsList = () => {

    const { restaurants } = useFilterContext()

    return (

        <>
            <Row>
                <RestaurantsFilter />
                {restaurants && restaurants.map(restaurant => (
                    <Col lg={3} md={4} sm={6} key={restaurant.id}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{restaurant.name}</Card.Title>
                                <Card.Text>
                                    {restaurant.description}
                                </Card.Text>
                                <Button variant="secondary" as={Link} to={`/restaurants/${restaurant.id}`}>More about restaurant...</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

        </>

    )
}

export default RestaurantsList