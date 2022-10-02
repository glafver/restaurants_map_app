import React, { useState, useEffect } from "react";
import RestaurantMap from "../components/RestaurantMap";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import useRestaurant from "../hooks/useRestaurant";
import { Table, Button } from "react-bootstrap";
import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { Link } from "react-router-dom";
import usePosition from "../hooks/usePosition";
import { getDistance } from 'geolib'
import { useAuthContext } from "../contexts/AuthContext";
import UploadPhotos from "../components/UploadPhotos";
import ImageGrid from "../components/ImageGrid";
import usePhotos from "../hooks/usePhotos";

const RestaurantPage = () => {

	const [linearDistance, setLinearDistance] = useState(null);
	const { id } = useParams()
	const { data } = useRestaurant(id)
	const position = usePosition()
	const { data: photos } = usePhotos(id)

	const { currentUser } = useAuthContext()


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

							<div className="d-flex flex-row justify-content-center mb-3">
								{data.fb &&
									<a className="text-dark" href={data.fb} >
										<FaFacebook className="mx-2" />
									</a>}
								{data.insta &&
									<a className="text-dark"  href={data.insta} >
										<FaInstagram className="mx-2" />
									</a>}
							</div>

						</Card.Body>
					</Card>
				</Col>
				<Col md={{ span: 6 }}>
					<RestaurantMap restaurantGeolocation={data.geolocation} />
				</Col>
			</Row>
			<Row className="justiify-content-center">
				<Col md={{ span: 12 }} >
					<ImageGrid photos={photos} />
					{currentUser &&
						<UploadPhotos restaurant_id={id} />
					}
				</Col>
			</Row>
		</Container >
	);
};

export default RestaurantPage;
