import { FaFacebook, FaInstagram } from 'react-icons/fa';
import { Table, Card } from "react-bootstrap";
import { useEffect } from 'react';
import usePosition from '../hooks/usePosition';
import { getDistance } from 'geolib'


const RestaurantCard = ({ data }) => {

    const position = usePosition()

    useEffect(() => {

        if (position.latitude && data.geolocation.lat) {
            let distance = getDistance(
                { latitude: data.geolocation.lat, longitude: data.geolocation.lat },
                { latitude: position.latitude, longitude: position.latitude }
            )
            data.distance = distance
        }
    }, [data.geolocation])

    return (
        <>
            <Card className="restaurant-page-card">
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
                                <td>{data.distance} m</td>
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
                            <a className="text-dark" href={data.insta} >
                                <FaInstagram className="mx-2" />
                            </a>}
                    </div>

                </Card.Body>
            </Card>
        </>

    )
}

export default RestaurantCard