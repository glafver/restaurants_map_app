import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/index";
import { toast } from 'react-toastify'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { useState, useEffect } from "react";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form"
import 'react-phone-number-input/style.css'

const SuggestForm = () => {

	const [addressValue, setAddressValue] = useState(null)
	const [addressError, setAddressError] = useState(null)

	const {
		formState: { errors },
		handleSubmit,
		register,
		control,
		reset
	} = useForm();

	const onCreate = async (data) => {

		console.log('lol')
		if (!addressValue) {
			const input = document.getElementById('react-select-5-input')
				|| document.getElementById('react-select-3-input')
			input.focus()
			setAddressError('Please choose the address.')
			return
		}

		data.adress = addressValue.label
		let geoCode = await geocodeByAddress(addressValue.label)
		data.geolocation = await getLatLng(geoCode[0])

		console.log(data)

		// await addDoc(collection(db, "suggestions"), {
		// 	...data,
		// });

		toast.success("Restaurant suggestion added!")
		setAddressValue(null)
		reset()
	};

	useEffect(() => {
		setAddressError(null)
	}, [addressValue])


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
									required: "Please enter the name of the Restaurant."
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
									placeholder: 'Search address',
									name: "address",
									onChange: setAddressValue,
									onLoadFailed: (error) => { console.log(error) }
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
									required: "Please fill in the description."
								})}
							/>
							{errors.description && <div>{errors.description.message}</div>}
						</Form.Group>

						<Form.Group controlId="cuisine" className="mb-3">
							<Form.Label>Cuisine *</Form.Label>

							<Form.Select
								className=""
								{...register("cuisine", {
									required: "Please choose cuisine."
								})}
							>
								<option></option>
								<option value="swedish">Swedish</option>
								<option value="italian">Italian</option>
								<option value="french">French</option>
								<option value="polish">Polish</option>
								<option value="russian">Russian</option>
								<option value="serbian">Serbian</option>
								<option value="japanese">Japanese</option>
								<option value="chinese">Chinese</option>
								<option value="thai">Thai</option>
								<option value="indian">Indian</option>
								<option value="vietnamese">Vietnamese</option>
								<option value="american">American</option>
								<option value="arabic">Arabic</option>
								<option value="european">European</option>
								<option value="other">Other</option>
							</Form.Select>
							{errors.cuisine && <div>{errors.cuisine.message}</div>}
						</Form.Group>

						<Form.Group controlId="type" className="mb-3">
							<Form.Label>Type *</Form.Label>
							<Form.Select
								className=""
								{...register("type", {
									required: "Please choose type of place."
								})}
							>
								<option></option>
								<option value="fine_dining">Fine dining</option>
								<option value="fast_food">Fast-food restaurant</option>
								<option value="cafe">Café</option>
								<option value="other">Other</option>
							</Form.Select>
							{errors.type && <div>{errors.type.message}</div>}
						</Form.Group>

						<Form.Group controlId="tel" className="mb-3">
							<Form.Label>Telephone</Form.Label>
							<PhoneInputWithCountry
								name="tel"
								control={control}
								rules={{ required: false }} />
						</Form.Group>

						<Form.Group controlId="web_site" className="mb-3">
							<Form.Label>Web site</Form.Label>
							<Form.Control
								type="text"
								{...register("web_site")}
							/>
						</Form.Group>

						<Form.Group controlId="fb" className="mb-3">
							<Form.Label>Facebook</Form.Label>
							<Form.Control
								type="text"
								{...register("fb")}
							/>
						</Form.Group>

						<Form.Group controlId="insta" className="mb-3">
							<Form.Label>Instagram</Form.Label>
							<Form.Control
								type="text"
								{...register("insta")}
							/>
						</Form.Group>

						<Button type="submit">Submit</Button>
					</Form>
				</Card.Body>
			</Card>

		</>
	);
};

export default SuggestForm;
