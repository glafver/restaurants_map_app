import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from 'react-router-dom'
import useGetSuggestion from "../hooks/useGetSuggestion"
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form"
import 'react-phone-number-input/style.css'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { db, storage } from '../firebase'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { ButtonGroup } from "react-bootstrap/";








const SuggestedRestaurant = () => {
	const { id } = useParams()
	const { data: suggestion, loading } = useGetSuggestion(id)
	const navigate = useNavigate()
	const [addressValue, setAddressValue] = useState(null)
	const [addressError, setAddressError] = useState(null)
	
	const [image, setImage] = useState(false)
	const [url, setUrl] = useState(false)
	

	const {
		control,
		formState: { errors },
		handleSubmit,
		register,
	} = useForm();

	

	const onSuggestion = async (newData) => {
		await addDoc(collection(db, "restaurants"), {
			...newData,
		});
	
		toast.success("New Restaurant added!");
	};

	const deleteSuggestion = async () => {
		const ref = doc(db, 'suggestions', id)
		await deleteDoc(ref)

		toast.success('Discarded')

		// redirect user to todos list
		navigate('/', { replace: true })
	}

	const onCreate = async (data) => {

		if (!addressValue) {
			document.querySelectorAll('[id^=react-select-]')[0].focus()
			setAddressError('Please choose the address.')
			return
		}

		data.adress = addressValue.label
		let geoCode = await geocodeByAddress(addressValue.label)
		data.geolocation = await getLatLng(geoCode[0])

		console.log(data)

		await addDoc(collection(db, "suggestions"), {
			...data,
		});

		toast.success("Restaurant suggestion added!")
		setAddressValue(null)
		reset()
	};

	const adminUploadPhoto = () => {
		const imageRef = ref(storage, `restaurant_photos/${image.name}`);
		uploadBytes(imageRef, image).then(() => {
			getDownloadURL(imageRef).then((url) => {
				setUrl(url)
			}).catch(error => {
				console.log(error.message, image )
			})
			setImage(null)
		}).catch(error => {
			console.log(error.message)
		})
	
	}

	const handleFileChange = (e) => {
		if (!e.target.files.length) {
			setPhoto(null)
			return
		}
	
		setImage(e.target.files[0])
	}


	useEffect(() => {
		setAddressError(null)
	}, [addressValue])


	

	console.log("TELEFONEN",suggestion.tel)

	
	return (
		<>
			<Card>
				<Card.Body>
					<Card.Title className="mb-3">Create a new restaurant</Card.Title>

					<Form onSubmit={handleSubmit(onCreate)} noValidate>

						<Form.Group controlId="name" className="mb-3">
							<Form.Label>Name *</Form.Label>
							<Form.Control
								value={suggestion.name}
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
								value={suggestion.description}
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
								value={suggestion.cuisine}
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
								value={suggestion.type}
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
								defaultValue={suggestion.tel}
								control={control}
								rules={{ required: false }} />
						</Form.Group>

						<Form.Group controlId="web_site" className="mb-3">
							<Form.Label>Web site</Form.Label>
							<Form.Control
								value={suggestion.web_site}
								type="text"
								{...register("web_site")}
							/>
						</Form.Group>

						<Form.Group controlId="fb" className="mb-3">
							<Form.Label>Facebook</Form.Label>
							<Form.Control
								type="text"
								value={suggestion.fb}
								{...register("fb")}
							/>
						</Form.Group>

						<Form.Group controlId="insta" className="mb-3">
							<Form.Label>Instagram</Form.Label>
							<Form.Control
								type="text"
								value={suggestion.insta}
								{...register("insta")}
							/>
						</Form.Group>
						<Form.Group id="photo" className="mb-3">
									<Form.Label>Photo</Form.Label>
									<Form.Control type="file" onChange={handleFileChange}/>
						</Form.Group>

						
					</Form>
					<ButtonGroup className="d-flex ">
						<Button onClick={adminUploadPhoto} type="submit">Submit</Button>
						<Button type="submit">Accept</Button>
						<Button className="border border-warning"variant="danger" onClick={deleteSuggestion}>Discard</Button>
					</ButtonGroup>
				</Card.Body>
			</Card>
			
		</>
	);
};

export default SuggestedRestaurant;
