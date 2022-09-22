import React from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import SuggestForm from "../components/SuggestForm";

const SuggestNewRestaurantPage = ({ suggestion }) => {
	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<SuggestForm />
				</Col>
			</Row>
		</Container>
	);
};

export default SuggestNewRestaurantPage;
