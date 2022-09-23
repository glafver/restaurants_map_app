import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/index";

const SuggestForm = () => {
	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm();

	const onSuggestion = async (data) => {
		await addDoc(collection(db, "suggestions"), {
			...data,
		});
		console.log("Suggestion added");
	};

	return (
		<Card>
			<Card.Body>
				<Card.Title className="mb-3">Suggest a new restaurant</Card.Title>
				<Form onSubmit={handleSubmit(onSuggestion)} noValidate>
					<Form.Group controlId="name" className="mb-3">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							{...register("name", {
								required: "Please enter the name of the Restaurant.",
								minLength: {
									value: 3,
									message: "A Restaurant needs at least 3 characters",
								},
							})}
						/>
					</Form.Group>
					<Form.Group controlId="adress" className="mb-3">
						<Form.Label>Adress</Form.Label>
						<Form.Control
							type="text"
							{...register("adress", {
								required: "Please enter the adress of the Restaurant",
							})}
						/>
					</Form.Group>
					<Form.Group className="mb-3" controlId="city">
						<Form.Label>City</Form.Label>
						<Form.Control
							{...register("city", {
								required: "Please enter the City Location",
							})}
							type="text"
							required
						/>
						{errors.title && <div>{errors.title.message}</div>}
					</Form.Group>

					<Form.Group controlId="description" className="mb-3">
						<Form.Label>Description</Form.Label>
						<Form.Control
							className="pb-5"
							type="text"
							{...register("description", {
								required: "This field cant be empty",
							})}
							placeholder="Tell us about the Restaurant"
						/>
					</Form.Group>
					<Form.Group controlId="cuisine" className="mb-3">
						<Form.Label>Cuisine</Form.Label>
						<Form.Control
							className=""
							{...register("cuisine", {
								required: "Req field",
							})}
							type="text"
							required
						/>
						{errors.title && <div>{errors.title.message}</div>}
					</Form.Group>

					<Form.Label>Type</Form.Label>
					<Form.Group controlId="type" className="mb-3">
						<Form.Select
							className=""
							{...register("type", {
								required: "This field cant be empty",
							})}
						>
							<option value="1">Fine dining</option>
							<option value="2">Fast-food restaurant</option>
							<option value="3">Three</option>
						</Form.Select>
					</Form.Group>

					<Button type="submit">Submit</Button>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default SuggestForm;
