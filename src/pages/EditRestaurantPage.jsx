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

    const { getRestaurant } = useRestaurant()
    const { data } = getRestaurant(id)

    return (
        <Container className="py-3 center-y">
            <Row>
                {data &&
                    <>
                        <Col md={{ span: 6, offset: 3 }}>

                            <EditRestaurantForm restaurant={data} />

                        </Col>

                        <EditRestaurantImageGrid id={id} />
                    </>
                }
            </Row>
        </Container>
    );
};

export default EditRestaurantPage
