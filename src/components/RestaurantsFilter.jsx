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

                            <option value="Swedish">Swedish</option>
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

                    </Form.Group>

                    <Form.Group >
                        <Form.Select {...register("type")}>
                            <option value="">{searchParams.get('type') || 'Filter by type'}</option>
                            <option value="Fine dining">Fine dining</option>
                            <option value="Fast food">Fast-food restaurant</option>
                            <option value="Cafe">Café</option>
                            <option value="Other">Other</option>
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