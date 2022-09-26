import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import useSuggestions from "../hooks/useSuggestions";

const SuggestedRestaurantsList = () => {
	const { data } = useSuggestions();

	return (
		<>
			<Row>
				{data &&
					data.map((suggestion) => (
						<Col lg={3} md={4} sm={6} key={suggestion.id}>
							<Card className="mb-4">
								<Card.Body>
									<Card.Title>{suggestion.name}</Card.Title>
									<Card.Text>{suggestion.description}</Card.Text>
									<Button
										variant="secondary"
										as={Link}
										to={`/suggestion/${suggestion.id}`}
									>
										More about suggestion...
									</Button>
								</Card.Body>
							</Card>
						</Col>
					))}
			</Row>
		</>
	);
};

export default SuggestedRestaurantsList;
