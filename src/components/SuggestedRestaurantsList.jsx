import { Card, Row, Col, Button } from 'react-bootstrap'
import useGetSuggestions from '../hooks/useGetSuggestions'

import { Link } from 'react-router-dom'

const SuggestedRestaurantsList = () => {

    // Get data from suggestions hook
    const { data } = useGetSuggestions()



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
								<Button className="custom-button" as={Link} to={`/suggestions/${suggestion.id}`} >Review</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
                {!data && <p>There is no suggestions yet.</p>}
            </Row>

        </>

    )
}

export default SuggestedRestaurantsList