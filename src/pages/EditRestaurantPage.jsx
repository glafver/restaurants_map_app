import React from "react"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import EditRestaurantForm from "../components/EditRestaurantForm"
import { useParams } from "react-router-dom"
import useRestaurant from "../hooks/useRestaurant"
import EditRestaurantImageGrid from "../components/EditRestaurantImageGrid"
import useEditPhotos from "../hooks/useEditPhotos"

const EditRestaurantPage = () => {

    const { id } = useParams()

    const { data } = useRestaurant(id)
    const { data: photos } = useEditPhotos(id)

    return (
        <Container className="py-3 center-y">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    {data &&
                        <EditRestaurantForm restaurant={data} />
                    }
                </Col>
                {photos &&
                    <EditRestaurantImageGrid photos={photos} />
                }
            </Row>
        </Container>
    );
};

export default EditRestaurantPage
