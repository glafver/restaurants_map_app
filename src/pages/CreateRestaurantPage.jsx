import React from "react"
import Col from "react-bootstrap/Col"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"
import CreateRestaurantForm from "../components/CreateRestaurantForm"

const CreateRestaurantPage = () => {
    return (
        <Container className="py-3 center-y">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <CreateRestaurantForm />
                </Col>
            </Row>
        </Container>
    );
};

export default CreateRestaurantPage
