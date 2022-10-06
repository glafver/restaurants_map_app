import React from "react";
import RestaurantsList from "../components/RestaurantsList";
import RestaurantsFilter from "../components/RestaurantsFilter";
import useRestaurants from "../hooks/useRestaurants";
import Map from "../components/Map";
import { Col, Row } from "react-bootstrap";

const RestaurantsPage = () => {
	const restaurants = useRestaurants();

	return (
		<div className="restaurants-page-container">
			<>
				<RestaurantsFilter />
				<Row
					className="flex-column flex-column-reverse flex-md-row m-0"
					style={{ maxWidth: "100vw", height: "100%" }}
				>
					<Col className="col-12 col-md-4 ps-0 m-0 restaurants-list-container">
						<RestaurantsList restaurants={restaurants} />
					</Col>
					<Col className="col-12 col-md-8 px-0">
						<Map restaurants={restaurants}></Map>
					</Col>
				</Row>
			</>
		</div>
	);
};

export default RestaurantsPage;
