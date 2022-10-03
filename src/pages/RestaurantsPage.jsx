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
		<div className="restaurants-page-container">
			<>
				<RestaurantsFilter />
				<Row className="flex-column flex-column-reverse flex-md-row">
					<Col className="col-12 col-md-4 pe-0 restaurants-list-container"><RestaurantsList restaurants={restaurants} /></Col>
					<Col className="col-12 col-md-8 ps-0"><Map restaurants={restaurants} ></Map></Col>
				</Row>
			</>
		</div>
	);
};

export default RestaurantsPage
