import RestaurantMap from "../components/RestaurantMap";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import { useParams } from "react-router-dom";
import useRestaurant from "../hooks/useRestaurant";
import { useAuthContext } from "../contexts/AuthContext";
import UploadPhotos from "../components/UploadPhotos";
import ImageGrid from "../components/ImageGrid";
import usePhotos from "../hooks/usePhotos";
import RestaurantCard from "../components/RestaurantCard";

const RestaurantPage = () => {

	const { id } = useParams()
	const { getRestaurant } = useRestaurant()
	const { data } = getRestaurant(id)

	const { data: photos } = usePhotos(id)

	const { currentUser } = useAuthContext()

	return (
		<>
			<Container className="py-3 center-y restaurant-page-container">
				<Row>
					<Col md={{ span: 6 }}>
						<RestaurantCard data={data} />
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

		</>
	);
};

export default RestaurantPage;
