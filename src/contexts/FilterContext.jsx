import { createContext, useContext, useEffect, useState } from 'react'
import useRestaurants from '../hooks/useRestaurants'

const FilterContext = createContext()

const useFilterContext = () => {
    return useContext(FilterContext)
}

const FilterContextProvider = ({ children }) => {

    const [filters, setFilters] = useState()
    const [restaurants, setRestaurants] = useState(null)

    // let cuisine = searchParams.get('cuisine')
    // let type = searchParams.get('type')
    // let sort = searchParams.get('sort')

    let { data } = useRestaurants()

    useEffect(() => {

        if (!data) {
            return
        }

        if (!filters) {
            setRestaurants(data)
            return
        }

        let filterRestaurants = data

        if (filters.cuisine) {
            filterRestaurants = filterRestaurants.filter(rest => {
                return rest.cuisine === filters.cuisine
            })
        }

        if (filters.type) {
            filterRestaurants = filterRestaurants.filter(rest => {
                return rest.type === filters.type
            })
        }

        if (filters.sort) {
            if (filters.sort === 'asc') {
                filterRestaurants.sort((a, b) => a.name.localeCompare(b.name))
            }
            if (filters.sort === 'dec') {
                filterRestaurants.sort((a, b) => b.name.localeCompare(a.name))
            }
        }

        setRestaurants(filterRestaurants)
    }, [filters])

    useEffect(() => {
        setRestaurants(data)
    }, [data])

    const contextValues = {
        filters, setFilters,
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