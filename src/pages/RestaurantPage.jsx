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
import PlaceholderPhoto from '../assets/images/placeholder_image.jpeg'

const RestaurantPage = () => {

	const { id } = useParams()
	const { getRestaurant } = useRestaurant()
	const { data } = getRestaurant(id)

	const { data: photos } = usePhotos(id)

	const { currentUser } = useAuthContext()

	return (
		<>
			{photos &&
				< div className="restaurant-page-container" >
					<Container className="py-3 center-y">
						<Row className='mb-3'>
							<Col sm={6}>
								<RestaurantCard data={data} />
							</Col>
							<Col sm={6} className="col-photo-restaurant" >
								<img src={photos && photos.length ? photos[0].url : PlaceholderPhoto} className='restaurant-photo' alt="restaurant photo" />
							</Col>
						</Row>
						<RestaurantMap restaurantGeolocation={data.geolocation} />
						<Row className="justiify-content-center">
							<Col md={{ span: 12 }} >
								<ImageGrid photos={photos} />
								{currentUser &&
									<UploadPhotos restaurant_id={id} />
								}
							</Col>
						</Row>
					</Container >
				</div >
			}
		</>
	);
};

export default RestaurantPage;
