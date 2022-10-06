import { Card, Row, Col, Button } from 'react-bootstrap'
import useGetSuggestions from '../hooks/useGetSuggestions'

import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

const SuggestedRestaurantsList = () => {

    // Get data from suggestions hook
    const { data } = useGetSuggestions()

    const [suggestions, setSuggestions] = useState(false)

    useEffect(()=> {
        if(data) {
            if(data.length !== 0){
                setSuggestions(true)
            }
        }
    },[data])
  

    return (

        <> 
            <Row>
                {suggestions ? data.map(suggestion => (
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
                )) : <h1>There are no suggestions</h1>}
                
            </Row>

        </>

    )
}

export default SuggestedRestaurantsList