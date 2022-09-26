import { Card, Row, Col, Button } from 'react-bootstrap'
import useSuggestions from '../hooks/useSuggestions'

const SuggestedRestaurantsList = () => {

    const { data } = useSuggestions()
    // console.log(data)

    return (

        <>
            <Row>
                {data && data.map(suggestion => (
                    <Col lg={3} md={4} sm={6} key={suggestion.id}>
                        <Card className="mb-4">
                            <Card.Body>
                                <Card.Title>{suggestion.name}</Card.Title>
                                <Card.Text>
                                    {suggestion.description}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>

        </>

    )
}

export default SuggestedRestaurantsList