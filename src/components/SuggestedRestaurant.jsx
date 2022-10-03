import React from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useForm } from "react-hook-form";
import { collection, addDoc, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/index";
import { toast } from 'react-toastify'
import GooglePlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { useState } from "react";
import PhoneInputWithCountry from "react-phone-number-input/react-hook-form"
import 'react-phone-number-input/style.css'
import ButtonGroup from "react-bootstrap/ButtonGroup"
import { useNavigate, useParams } from 'react-router-dom'

const SuggestedRestaurant = ({ restaurant }) => {
	const { id } = useParams()
	const navigate = useNavigate()

    const [addressValue, setAddressValue] = useState('')

    const {
        handleSubmit,
        register,
        control

    } = useForm();

    const onEdit = async (data) => {

        if (addressValue) {
            console.log(addressValue)
            let geoCode = await geocodeByAddress(addressValue.label)
            data.geolocation = await getLatLng(geoCode[0])
        }

        let newData = {
            name: data.name || restaurant.name,
            adress: addressValue.label || restaurant.adress,
            geolocation: data.geolocation || restaurant.geolocation,
            description: data.description || restaurant.description,
            cuisine: data.cuisine || restaurant.cuisine,
            type: data.type || restaurant.type,
            web_site: data.web_site,
            insta: data.insta,
            fb: data.fb,
            tel: data.tel,
            e_mail: data.e_mail
        }

      
        await addDoc(collection(db, "restaurants"), {
			...restaurant,
		})

		const suggestionRef = doc(db, 'suggestions', id)
		await deleteDoc(suggestionRef)

        toast.success("Restaurant updated!")

		navigate('/restaurants', { replace: true })
    }



	const deleteSuggestion = async () => {
		const suggestionRef = doc(db, 'suggestions', restaurant.id)
		await deleteDoc(suggestionRef)

		toast.success('Discarded')

		// redirect user to todos list
		navigate('/restaurants', { replace: true })
	}


    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Title className="mb-3">Edit a restaurant</Card.Title>

                    <Form onSubmit={handleSubmit(onEdit)} noValidate>
                        <Form.Group controlId="name" className="mb-3">
                            <Form.Label>Name *</Form.Label>
                            <Form.Control
                                defaultValue={restaurant.name}
                                type="text"
                                {...register("name")}
                            />
                        </Form.Group>

                        {/* Geolocation field */}

                        <Form.Group controlId="geolocation" className="mb-3">
                            <Form.Label>Address *</Form.Label>
                            <GooglePlacesAutocomplete
                                apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
                                selectProps={{
                                    value: addressValue,
                                    placeholder: restaurant.adress,
                                    name: "address",
                                    onChange: setAddressValue,
                                    onLoadFailed: (error) => { console.log(error) }
                                }}
                            />

                        </Form.Group>


                        <Form.Group controlId="description" className="mb-3">
                            <Form.Label>Description *</Form.Label>
                            <Form.Control
                                defaultValue={restaurant.description}
                                className="pb-5"
                                type="text"
                                {...register("description")}
                            />
                        </Form.Group>

                        <Form.Group controlId="cuisine" className="mb-3">
                            <Form.Label>Cuisine *</Form.Label>
                            <Form.Select
                                className=""
                                {...register("cuisine")}
                            >
                                <option>{restaurant.cuisine}</option>
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
                        </Form.Group>

                        <Form.Group controlId="type" className="mb-3">
                            <Form.Label>Type *</Form.Label>
                            <Form.Select
                                className=""
                                {...register("type")}
                            >
                                <option>{restaurant.type}</option>
                                <option value="fine_dining">Fine dining</option>
                                <option value="fast_food">Fast-food restaurant</option>
                                <option value="cafe">Café</option>
                                <option value="other">Other</option>
                            </Form.Select>
                        </Form.Group>

                        <Form.Group controlId="tel" className="mb-3">
                            <Form.Label>Telephone</Form.Label>
                            <PhoneInputWithCountry
                                control={control}
                                placeholder={restaurant.tel}
                                name="tel"
                                rules={{ required: false }}
                            />
                        </Form.Group>

                        <Form.Group controlId="e_mail" className="mb-3">
                            <Form.Label>E-mail</Form.Label>
                            <Form.Control
                                defaultValue={restaurant.e_mail}
                                type="text"
                                {...register("e_mail")}
                            />
                        </Form.Group>

                        <Form.Group controlId="web_site" className="mb-3">
                            <Form.Label>Web site</Form.Label>
                            <Form.Control
                                defaultValue={restaurant.web_site}
                                type="text"
                                {...register("web_site")}
                            />
                        </Form.Group>

                        <Form.Group controlId="fb" className="mb-3">
                            <Form.Label>Facebook</Form.Label>
                            <Form.Control
                                defaultValue={restaurant.fb}
                                type="text"
                                {...register("fb")}
                            />
                        </Form.Group>

                        <Form.Group controlId="insta" className="mb-3">
                            <Form.Label>Instagram</Form.Label>
                            <Form.Control
                                defaultValue={restaurant.insta}
                                type="text"
                                {...register("insta")}
                            />
                        </Form.Group>
						<ButtonGroup className="d-flex"><Button type="submit" className="mb-3 mx-auto">Submit</Button>
						<Button variant="danger" className="mb-3 mx-auto" onClick={deleteSuggestion}>Discard</Button></ButtonGroup>
                        
                    </Form>
                </Card.Body>
            </Card>

					<Form.Group controlId="insta" className="mb-3">
						<Form.Label>Instagram</Form.Label>
						<Form.Control
							value={suggestion.insta}
							type="text"
							{...register("insta")}
						/>
					</Form.Group>



					<ButtonGroup className="d-flex">
						<Button className="custom-button" type="submit">Accept</Button>
						<Button variant="danger" onClick={deleteSuggestion}>Discard</Button>
					</ButtonGroup>
				</Form>
			</Card.Body>
		</Card>
	);
};

export default SuggestedRestaurant;