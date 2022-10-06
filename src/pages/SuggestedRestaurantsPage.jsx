import React from "react";
import Container from "react-bootstrap/Container";
import SuggestedRestaurantsList from "../components/SuggestedRestaurantsList";

const SuggestedRestaurantsPage = () => {
	return (
		<Container className="py-3 center-y">
			<SuggestedRestaurantsList />
		</Container>
	);
};

export default SuggestedRestaurantsPage;
