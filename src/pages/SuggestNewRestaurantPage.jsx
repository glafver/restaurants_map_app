import React from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const SuggestNewRestaurantPage = () => {
	const handleSubmit = async (e) => {
		e.preventDefault();

		// try to log in the user with the specified credentials
		try {
			console.log("Would send data");
		} catch (err) {
			setError(err.message);
		}
	};
	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title className="mb-3">Log In</Card.Title>
							<Form onSubmit={handleSubmit}>
								<Form.Group id="name" className="mb-3">
									<Form.Label>Name of Restaurant</Form.Label>
									<Form.Control type="text" required />
								</Form.Group>
								<Form.Group id="adress" className="mb-3">
									<Form.Label>Adress</Form.Label>
									<Form.Control type="text" required />
								</Form.Group>
								<Form.Group id="desc" className="mb-3">
									<Form.Label>Description</Form.Label>
									<Form.Control
										className="pb-5"
										type="text"
										required
										placeholder="Tell us about the restaurant (type of food, price etc)"
									/>
								</Form.Group>

								<Button type="submit">Submit</Button>
							</Form>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	);
};

export default SuggestNewRestaurantPage;
