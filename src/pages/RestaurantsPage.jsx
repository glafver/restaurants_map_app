import React from "react"
import Container from "react-bootstrap/Container"
import RestaurantsList from "../components/RestaurantsList"

const RestaurantsPage = () => {
	return (
		<Container className="py-3 center-y">
			<RestaurantsList />
		</Container>
	);
};

export default RestaurantsPage
