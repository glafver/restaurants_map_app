import React from "react";
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
		// Add new document to collection

		await addDoc(collection(db, "restaurants"), {
			...data,
		});
		console.log("Restaurant added");
	};

	return (
		<Card>
			<Card.Body>
				<Card.Title className="mb-3">Suggest a new restaurant</Card.Title>
				<Form onSubmit={handleSubmit(onSuggestion)} noValidate>
					<Form.Group id="name" className="mb-3">
						<Form.Label>Name of Restaurant</Form.Label>
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
					<Form.Group id="adress" className="mb-3">
						<Form.Label>Adress</Form.Label>
						<Form.Control
							type="text"
							{...register("adress", {
								required: "Please enter the adress of the Restaurant",
							})}
						/>
					</Form.Group>
					<Form.Group id="desc" className="mb-3">
						<Form.Label>Description</Form.Label>
						<Form.Control
							className="pb-5"
							type="text"
							placeholder="Tell us about the restaurant (type of food, price etc)"
						/>
						{errors.title && <div>{errors.title.message}</div>}
					</Form.Group>
					<Button type="submit">Submit</Button>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default SuggestForm;
