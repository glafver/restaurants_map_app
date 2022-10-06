import RestaurantImage from "../assets/images/placeholder_image.jpeg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faUtensils,
	faLocationDot,
	faCircleInfo,
	faRoute,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import usePhotos from "../hooks/usePhotos";

const RestaurantsListCard = ({ restaurant }) => {
	const { data: photos } = usePhotos(restaurant.id);

	const getDirection = (geo) => {
		const googleLink = "https://www.google.com/maps/dir/?api=1&destination=";
		const position = `${geo.lat},${geo.lng}`;
		const destinationToURL = encodeURIComponent(position);
		const destinantionLink = googleLink + destinationToURL;
		window.open(destinantionLink, "_blank");
	};

	return (
		<div className="col-12 d-flex flex-column flex-md-row card-restaurant-wrapper pe-0">
			<Card className="restaurant-card col-12 col-md-6">
				<Card.Body className="card-body">
					<Card.Title className="restaurant-card-title">
						{restaurant.name}
					</Card.Title>
					<div>
						<p className="card-restaurant-info">
							{" "}
							<FontAwesomeIcon
								className="card-icons"
								icon={faLocationDot}
							/>{" "}
							{restaurant.adress}
						</p>
						<p className="card-restaurant-info">
							<FontAwesomeIcon className="card-icons" icon={faUtensils} />{" "}
							{restaurant.cuisine}
						</p>
						<p className="card-restaurant-info">
							<FontAwesomeIcon className="card-icons" icon={faCircleInfo} />
							<Link className="nav-color" to={`/restaurants/${restaurant.id}`}>
								More info
							</Link>{" "}
						</p>
						<Link
							className="nav-color direction-link"
							onClick={() => getDirection(restaurant.geolocation)}
						>
							Get direction
						</Link>
					</div>
				</Card.Body>
				<Card.Footer className="card-footer">
					{restaurant.distance ? (
						<>
							{" "}
							<FontAwesomeIcon className="card-icons" icon={faRoute} />{" "}
							{restaurant.distance} m
						</>
					) : (
						""
					)}
				</Card.Footer>
			</Card>

			<div
				className="restaurant-card col-12 col-md-6"
				style={{
					backgroundImage:
						photos && photos.length
							? `url(${photos[0].url})`
							: `url(${RestaurantImage})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
				}}
			></div>
		</div>
	);
};

export default RestaurantsListCard;
