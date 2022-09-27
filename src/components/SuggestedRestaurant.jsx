import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/index";
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom'
import useGetSuggestion from "../hooks/useGetSuggestion"

import  ButtonGroup  from "react-bootstrap/ButtonGroup";

const SuggestedRestaurant = () => {
	const { id } = useParams()
	const { data: suggestion, loading } = useGetSuggestion(id)
	const navigate = useNavigate()

	

	const {
		formState: { errors },
		handleSubmit,
		register,
	} = useForm();

	const onSuggestion = async (newData) => {
		await addDoc(collection(db, "restaurants"), {
			...newData,
		});
	
		toast.success("Restaurant Accepted!");
	};

	const deleteSuggestion = async () => {
		const ref = doc(db, 'suggestions', id)
		await deleteDoc(ref)

		toast.success('Discarded')

		// redirect user to todos list
		navigate('/', { replace: true })
	}
	
	return (
		<Card>
			<Card.Body>
				<Card.Title className="mb-3">Suggest a new restaurant</Card.Title>
				<Form onSubmit={handleSubmit(onSuggestion)} noValidate>
					<Form.Group controlId="name" className="mb-3">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="text"
							value={suggestion.name}
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
							value={suggestion.adress}
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
							value={suggestion.adress}
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
							value={suggestion.description}
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
							value={suggestion.cuisine}
							required
						/>
						{errors.title && <div>{errors.title.message}</div>}
					</Form.Group>

					<Form.Label>Type</Form.Label>
					<Form.Group controlId="type" className="mb-3">
						<Form.Select
							className=""
							value={suggestion.type}
							{...register("type", {
								required: "This field cant be empty",
							})}
						>
							<option value="Café">Café</option>
							<option value="Restaurant">Restaurant</option>
							<option value="Fast-food restaurant">Fast-food restaurant</option>
							<option value="Kiosk/Grill">Kiosk/Grill</option>
							<option value="Foodtruck">Foodtruck</option>							
						</Form.Select>
					</Form.Group>

					<Form.Label>Offers</Form.Label>
					<Form.Group controlId="offers" className="mb-3">
						<Form.Select
							className=""
							value={suggestion.offers}
							{...register("offers", {
								required: "This field cant be empty",
							})}
						>
							<option value="Café">Café</option>
							<option value="Restaurant">Restaurant</option>
							<option value="Fast-food restaurant">Fast-food restaurant</option>
							<option value="Kiosk/Grill">Kiosk/Grill</option>
							<option value="Foodtruck">Foodtruck</option>							
						</Form.Select>
					</Form.Group>

					

					<ButtonGroup className="d-flex">
						<Button type="submit">Accept</Button>
						<Button variant="danger" onClick={deleteSuggestion}>Discard</Button>
					</ButtonGroup>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default SuggestedRestaurant;
