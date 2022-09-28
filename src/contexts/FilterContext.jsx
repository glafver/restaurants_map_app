import { createContext, useContext, useEffect, useState } from 'react'
import useRestaurants from '../hooks/useRestaurants'
import { useSearchParams } from 'react-router-dom'

const FilterContext = createContext()

const useFilterContext = () => {
    return useContext(FilterContext)
}

const FilterContextProvider = ({ children }) => {

    const [restaurants, setRestaurants] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()

    let params = {
        cuisine: searchParams.get('cuisine'),
        type: searchParams.get('type'),
        sort: searchParams.get('sort')
    }

    let { data } = useRestaurants()

    let filterData = (data, filtersValues) => {

        let restaurants = data

        if (filtersValues.cuisine) {
            restaurants = restaurants.filter(rest => {
                return rest.cuisine === filtersValues.cuisine
            })
        }

        if (filtersValues.type) {
            restaurants = restaurants.filter(rest => {
                return rest.type === filtersValues.type
            })
        }

        if (filtersValues.sort) {
            if (filtersValues.sort === 'asc') {
                restaurants.sort((a, b) => a.name.localeCompare(b.name))
            }
            if (filtersValues.sort === 'dec') {
                restaurants.sort((a, b) => b.name.localeCompare(a.name))
            }
        }

        return restaurants

    }

    useEffect(() => {

        if (!data) {
            return
        }

        setRestaurants(filterData(data, params))
    }, [data, searchParams])

    const contextValues = {
        restaurants, setRestaurants
    }

    return (
        <FilterContext.Provider value={contextValues}>
            {children}
        </FilterContext.Provider>
    )
}

export {
    FilterContextProvider as default,
    useFilterContext,
}