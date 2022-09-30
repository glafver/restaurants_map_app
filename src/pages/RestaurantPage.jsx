import React from "react";
import Map from "../components/Map";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { getStorage, ref, listAll } from "firebase/storage";

const RestaurantPage = () => {


const storage = getStorage();

// Create a reference under which you want to list
const listRef = ref(storage, 'files/uid');

// Find all the prefixes and items.
listAll(listRef)
  .then((res) => {
    res.prefixes.forEach((folderRef) => {
      // All the prefixes under listRef.
      // You may call listAll() recursively on them.
    });
    res.items.forEach((itemRef) => {
      // All the items under listRef.
    });
  }).catch((error) => {
    // Uh-oh, an error occurred!
  });

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
