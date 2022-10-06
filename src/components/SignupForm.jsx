import React, { useRef, useState } from "react";
import {
	Container,
	Row,
	Col,
	Form,
	Button,
	Card,
	Alert,
} from "react-bootstrap";

const SignupForm = ({ setFormValues }) => {
	const [photo, setPhoto] = useState(false);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const emailRef = useRef();
	const displayNameRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();

	const handlePhotoChange = (e) => {
		if (!e.target.files.length) {
			setPhoto(null);
			return;
		}

		setPhoto(e.target.files[0]);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("The passwords does not match");
		}

		setError(null);

		try {
			setLoading(true);

			setFormValues({
				email: emailRef.current.value,
				password: passwordRef.current.value,
				name: displayNameRef.current.value,
				photo,
			});
		} catch (err) {
			setError(err.message);
			setLoading(false);
		}
	};

	return (
		<>
			{error && <Alert variant="danger">{error}</Alert>}

			<Form role={"form"} onSubmit={handleSubmit}>
				<Form.Group id="displayName" className="mb-3">
					<Form.Label id="username-label">Username</Form.Label>
					<Form.Control
						aria-labelledby="username-label"
						type="text"
						ref={displayNameRef}
						required
					/>
				</Form.Group>

				<Form.Group id="email" className="mb-3">
					<Form.Label id="email-label">Email</Form.Label>
					<Form.Control
						aria-labelledby="email-label"
						type="email"
						ref={emailRef}
						required
					/>
				</Form.Group>

				<Form.Group id="photo" className="mb-3">
					<Form.Label id="photo-label">Photo</Form.Label>
					<Form.Control
						aria-labelledby="photo-label"
						type="file"
						onChange={handlePhotoChange}
					/>
					<Form.Text>
						{photo
							? `${photo.name} (${Math.round(photo.size / 1024)} kB)`
							: "No photo selected"}
					</Form.Text>
				</Form.Group>

				<Form.Group id="password" className="mb-3">
					<Form.Label id="password-label">Password</Form.Label>
					<Form.Control
						aria-labelledby="password-label"
						type="password"
						ref={passwordRef}
						required
					/>
				</Form.Group>

				<Form.Group id="password-confirm" className="mb-3">
					<Form.Label id="password-confirm-label">
						Password Confirmation
					</Form.Label>
					<Form.Control
						aria-labelledby="password-confirm-label"
						type="password"
						ref={passwordConfirmRef}
						required
					/>
				</Form.Group>

				<Button className="custom-button" disabled={loading} type="submit">
					Create Account
				</Button>
			</Form>
		</>
	);
};

export default SignupForm;
