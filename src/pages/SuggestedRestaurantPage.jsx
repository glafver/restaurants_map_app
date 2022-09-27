import React from 'react'
import SuggestedRestaurant from '../components/SuggestedRestaurant'
import Container  from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col"

const SuggestedRestaurantPage = () => {
  return (
    <Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
        <SuggestedRestaurant/>
				</Col>
			</Row>
		</Container>
    
  )
}

export default SuggestedRestaurantPage