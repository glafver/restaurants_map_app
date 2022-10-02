import React from "react"
import Container from "react-bootstrap/Container"
import RestaurantsList from "../components/RestaurantsList"
import RestaurantsFilter from "../components/RestaurantsFilter"
import useRestaurants from "../hooks/useRestaurants"
import Map from "../components/Map"
import { Col, Row } from "react-bootstrap"

const RestaurantsPage = () => {

	const restaurants = useRestaurants()

	return (
		<Container className="py-3 center-y">

			<>
				<RestaurantsFilter />
				<Row>
					<Col className="col-6"><RestaurantsList restaurants={restaurants} /></Col>
					<Col className="col-6"><Map restaurants={restaurants} ></Map></Col>
				</Row>
			</>

		</Container>
	);
};

export default RestaurantsPage
