import { Form, Button } from "react-bootstrap";

const LoginForm = ({ handleSubmit, emailRef, passwordRef, loading }) => {
	return (
		<>
			<Form aria-label="form" onSubmit={handleSubmit}>
				<Form.Group id="email" className="mb-3">
					<Form.Label>Email</Form.Label>
					<Form.Control
						aria-label="email"
						type="email"
						ref={emailRef}
						required
					/>
				</Form.Group>

				<Form.Group id="password" className="mb-3">
					<Form.Label>Password</Form.Label>
					<Form.Control
						aria-label="password"
						type="password"
						ref={passwordRef}
						required
					/>
				</Form.Group>

				<Button className="custom-button" disabled={loading} type="submit">
					Log In
				</Button>
			</Form>
		</>
	);
};
export default LoginForm;
