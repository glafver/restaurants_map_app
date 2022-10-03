import React from 'react'
import SuggestedRestaurant from '../components/SuggestedRestaurant'
import Container  from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from "react-bootstrap/Col"
import useEditPhotos from "../hooks/useEditPhotos"
import useSuggestion from "../hooks/useGetSuggestion"
import { useParams } from "react-router-dom"

const SuggestedRestaurantPage = () => {
	const { id } = useParams()
	const { data } = useSuggestion(id)
    const { data: photos } = useEditPhotos(id)
  return (
    <Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
        <SuggestedRestaurant restaurant={data}  />
				</Col>
			</Row>
		</Container>
    
  )
}

export default SuggestedRestaurantPage