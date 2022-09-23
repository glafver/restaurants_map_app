import React from "react";
import Map from "../components/Map";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

const RestaurantPage = () => {

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title>Restaurant Title</Card.Title>
							<Card.Text>Some text about the Restaurant</Card.Text>
							<Card.Img variant="top" src="holder.js/100px180" />
						</Card.Body>
					</Card>
					<Map />
				</Col>
			</Row>
			<Row>
				<Col md={{ span: 6, offset: 3 }}></Col>
			</Row>
		</Container>
	);
};

export default RestaurantPage;
