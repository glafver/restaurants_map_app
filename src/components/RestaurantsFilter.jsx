import React from 'react'
import { useForm } from "react-hook-form"
import { Button, Form } from 'react-bootstrap'
import { useSearchParams } from 'react-router-dom'

const RestaurantsFilter = () => {

    const [searchParams, setSearchParams] = useSearchParams()

    const {
        handleSubmit,
        register,
        reset
    } = useForm();

    const filterData = (filters) => {
        // check if we have new filters or set the previous filters
        filters.cuisine ? filters.cuisine : searchParams.get('cuisine') ? filters.cuisine = searchParams.get('cuisine') : ''
        filters.type ? filters.type : searchParams.get('type') ? filters.type = searchParams.get('type') : ''
        filters.sort ? filters.sort : searchParams.get('sort') ? filters.sort = searchParams.get('sort') : ''
        setSearchParams(filters)
    }

    const resetFilters = () => {
        // reset form
        reset()

        // reset serchParams
        searchParams.delete('cuisine', 'type', 'sort')
        searchParams.delete('type')
        searchParams.delete('sort')
        setSearchParams(searchParams)
    }

    return (
        <>
            <div className='border rounded mb-3'>
                <Form onSubmit={handleSubmit(filterData)} className='d-flex justify-content-around my-4'>
                    <Form.Group>
                        <Form.Select {...register("cuisine")}>
                            <option value="">{searchParams.get('cuisine') || 'Filter by cuisine'}</option>
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

                    <Form.Group >
                        <Form.Select {...register("type")}>
                            <option value="">{searchParams.get('type') || 'Filter by type'}</option>
                            <option value="fine_dining">Fine dining</option>
                            <option value="fast_food">Fast-food restaurant</option>
                            <option value="cafe">Café</option>
                            <option value="other">Other</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group >
                        <Form.Select {...register('sort')}>
                            <option value="">{'Sort by name'}</option>
                            <option value="acs">🔼</option>
                            <option value="dec">🔽</option>
                        </Form.Select>
                    </Form.Group>

                    <Button type="submit">Apply filters</Button>
                    <Button onClick={() => resetFilters()}>Reset filters</Button>
                </Form>

            </div>
        </>

    )
}

export default RestaurantsFilter