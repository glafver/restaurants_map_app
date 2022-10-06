import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/index";
import { toast } from "react-toastify";
import GooglePlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
} from "react-google-places-autocomplete";
import { useState, useEffect } from "react";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form";
import "react-phone-number-input/style.css";

const SuggestForm = () => {
	const [addressValue, setAddressValue] = useState(null);
	const [addressError, setAddressError] = useState(null);

	const {
		formState: { errors },
		handleSubmit,
		register,
		control,
		reset,
	} = useForm();

	const onCreate = async (data) => {
		if (!addressValue) {
			document.querySelectorAll("[id^=react-select-]")[0].focus();
			setAddressError("Please choose the address.");
			return;
		}

		data.adress = addressValue.label;
		let geoCode = await geocodeByAddress(addressValue.label);
		data.geolocation = await getLatLng(geoCode[0]);

		await addDoc(collection(db, "suggestions"), {
			...data,
		});

		toast.success("Restaurant suggestion added!");
		setAddressValue(null);
		reset();
	};

	useEffect(() => {
		setAddressError(null);
	}, [addressValue]);

	return (
		<>
			<Card>
				<Card.Body>
					<Card.Title className="mb-3">Suggest a new restaurant</Card.Title>

					<Form onSubmit={handleSubmit(onCreate)} noValidate>
						<Form.Group controlId="name" className="mb-3">
							<Form.Label>Name *</Form.Label>
							<Form.Control
								type="text"
								{...register("name", {
									required: "Please enter the name of the Restaurant.",
								})}
							/>
							{errors.name && <div>{errors.name.message}</div>}
						</Form.Group>

						{/* Geolocation field */}
						<Form.Group controlId="geolocation" className="mb-3">
							<Form.Label>Address *</Form.Label>
							<GooglePlacesAutocomplete
								apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
								selectProps={{
									value: addressValue,
									placeholder: "Search address",
									name: "address",
									onChange: setAddressValue,
									onLoadFailed: (error) => {
										console.log(error);
									},
								}}
							/>
							{addressError && <div>{addressError}</div>}
						</Form.Group>

						<Form.Group controlId="description" className="mb-3">
							<Form.Label>Description *</Form.Label>
							<Form.Control
								className="pb-5"
								type="text"
								{...register("description", {
									required: "Please fill in the description.",
								})}
							/>
							{errors.description && <div>{errors.description.message}</div>}
						</Form.Group>

						<Form.Group controlId="cuisine" className="mb-3">
							<Form.Label>Cuisine *</Form.Label>

							<Form.Select
								className=""
								{...register("cuisine", {
									required: "Please choose cuisine.",
								})}
							>
								<option></option>
								<option value="Italian">Italian</option>
								<option value="French">French</option>
								<option value="Polish">Polish</option>
								<option value="Russian">Russian</option>
								<option value="Serbian">Serbian</option>
								<option value="Japanese">Japanese</option>
								<option value="Chinese">Chinese</option>
								<option value="Thai">Thai</option>
								<option value="Indian">Indian</option>
								<option value="Vietnamese">Vietnamese</option>
								<option value="American">American</option>
								<option value="Arabic">Arabic</option>
								<option value="European">European</option>
								<option value="Other">Other</option>
							</Form.Select>
							{errors.cuisine && <div>{errors.cuisine.message}</div>}
						</Form.Group>

						<Form.Group controlId="type" className="mb-3">
							<Form.Label>Type *</Form.Label>
							<Form.Select
								className=""
								{...register("type", {
									required: "Please choose type of place.",
								})}
							>
								<option></option>
								<option value="Fine dining">Fine dining</option>
								<option value="Fast food">Fast-food restaurant</option>
								<option value="Cafe">Café</option>
								<option value="Other">Other</option>
							</Form.Select>
							{errors.type && <div>{errors.type.message}</div>}
						</Form.Group>

						<Form.Group controlId="tel" className="mb-3">
							<Form.Label>Telephone</Form.Label>
							<PhoneInputWithCountry
								name="tel"
								control={control}
								rules={{ required: false }}
							/>
						</Form.Group>

						<Form.Group controlId="e_mail" className="mb-3">
							<Form.Label>E-mail</Form.Label>
							<Form.Control type="text" {...register("e_mail")} />
						</Form.Group>

						<Form.Group controlId="web_site" className="mb-3">
							<Form.Label>Website</Form.Label>
							<Form.Control type="text" {...register("web_site")} />
						</Form.Group>

						<Form.Group controlId="fb" className="mb-3">
							<Form.Label>Facebook</Form.Label>
							<Form.Control type="text" {...register("fb")} />
						</Form.Group>

						<Form.Group controlId="insta" className="mb-3">
							<Form.Label>Instagram</Form.Label>
							<Form.Control type="text" {...register("insta")} />
						</Form.Group>

						<Button type="submit" className="custom-button">
							Submit
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</>
	);
};

export default SuggestForm;
