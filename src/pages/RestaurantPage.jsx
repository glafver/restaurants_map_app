import React, { useState, useEffect } from "react";
import RestaurantMap from "../components/RestaurantMap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import useRestaurant from "../hooks/useRestaurant";
import { Table } from "react-bootstrap";
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { Link } from "react-router-dom";
import usePosition from "../hooks/usePosition";
import { getDistance } from 'geolib'

const RestaurantPage = () => {

	const [linearDistance, setLinearDistance] = useState(null);
	const { id } = useParams()
	const { data } = useRestaurant(id)
	const position = usePosition()


	useEffect(() => {

		if (position.latitude && data.geolocation.lat) {
			let distance = getDistance(
				{ latitude: data.geolocation.lat, longitude: data.geolocation.lat },
				{ latitude: position.latitude, longitude: position.latitude }
			)
			setLinearDistance(distance)
		}
	}, [data.geolocation])

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6 }}>
					<Card>
						<Card.Body>
							<Card.Title className="text-center">{data.name}</Card.Title>


							<Table>
								<tbody>
									<tr>
										<td><b>Address:</b></td>
										<td>{data.adress}</td>
									</tr>
									<tr>
										<td><b>Distance:</b></td>
										<td>{linearDistance} m</td>
									</tr>
									<tr>
										<td><b>Type:</b></td>
										<td>{data.type}</td>
									</tr>
									<tr>
										<td><b>Cuisine:</b></td>
										<td>{data.cuisine}</td>
									</tr>
									<tr>
										<td><b>Description:</b></td>
										<td>{data.description}</td>
									</tr>
									<tr>
										<td><b>Telephone:</b></td>
										<td>{data.tel}</td>
									</tr>
									<tr>
										<td><b>Web site:</b></td>
										<td>{data.web_site}</td>
									</tr>
								</tbody>
							</Table>

							<div className="d-flex flex-row justify-content-center">
								{data.fb &&
									<Link className="text-dark" to={data.fb} >
										<FaFacebook className="mx-2" />
									</Link>}
								{data.insta &&
									<Link className="text-dark" to={data.insta} >
										<FaInstagram className="mx-2" />
									</Link>}
							</div>

						</Card.Body>
					</Card>
				</Col>
				<Col md={{ span: 6 }}>
					<RestaurantMap restaurantGeolocation={data.geolocation} />
				</Col>
			</Row>
			<Row>
				<Col md={{ span: 6, offset: 3 }}></Col>
			</Row>
		</Container>
	);
};

export default RestaurantPage;
