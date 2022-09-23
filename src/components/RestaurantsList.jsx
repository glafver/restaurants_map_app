import { Card, Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import useRestaurants from '../hooks/useRestaurants'

const RestaurantsList = () => {

    const { data } = useRestaurants()
    // console.log(data)

    return (

        <>
            <Row>
                {data && data.map(restaurant => (
                    <Col lg={3} md={4} sm={6} key={restaurant.id}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{restaurant.name}</Card.Title>
                                <Card.Text>
                                    <Button variant="secondary" as={Link} to={`/restaurant/${restaurant.id}`}>More about restaurant...</Button>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

        </>

    )
}

export default RestaurantsList