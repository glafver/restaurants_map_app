import React from "react"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import EditRestaurantForm from "../components/EditRestaurantForm"
import { useParams } from "react-router-dom"
import useRestaurant from "../hooks/useRestaurant"

const EditRestaurantPage = () => {

    const { id } = useParams()

    const { data } = useRestaurant(id)
    console.log(data)

    return (
        <Container className="py-3 center-y">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h1>{id}</h1>
                    {data &&
                        <EditRestaurantForm restaurant={data} />
                    }
                </Col>
            </Row>
        </Container>
    );
};

export default EditRestaurantPage
