import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthContext";
import SignupForm from "../components/SignupForm";

const SignupPage = () => {
	const [formValues, setFormValues] = useState();

	const { signup } = useAuthContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!formValues) {
			return;
		}
		signup(
			formValues.email,
			formValues.password,
			formValues.name,
			formValues.photo
		);
		navigate("/");
	}, [formValues]);

	return (
		<Container className="py-3 center-y">
			<Row>
				<Col md={{ span: 6, offset: 3 }}>
					<Card>
						<Card.Body>
							<Card.Title className="mb-3">Sign Up</Card.Title>

							<SignupForm setFormValues={setFormValues}></SignupForm>
						</Card.Body>
					</Card>

					<div className="text-center mt-3">
						Already have an account? <Link to="/login">Log In</Link>
					</div>
				</Col>
			</Row>
		</Container>
	);
};

export default SignupPage;
