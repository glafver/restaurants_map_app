import useRestaurants from "../hooks/useRestaurants"
import { useMemo } from "react"
import { Button, ButtonGroup, Container } from "react-bootstrap"
import { Link } from "react-router-dom"
import SortableTable from "../components/SortableTable"
import useRestaurant from "../hooks/useRestaurant"

const EditRestaurantsPage = () => {

    const data = useRestaurants()
    const { deleteRestaurant } = useRestaurant()

    const columns = useMemo(() => {
        return [

            {
                Header: '#',
                accessor: 'index',
                Cell: (row) => {
                    return <div>{row.row.index + 1}</div>;
                },
            },
            {
                Header: 'Name',
                accessor: 'name'
            },
            {
                Header: 'Type',
                accessor: 'type'
            },
            {
                Header: 'Cuisine',
                accessor: 'cuisine'
            },
            {
                Header: 'Address',
                accessor: 'adress'
            },
            {
                accessor: 'edit',
                id: 'id',
                value: 'id',
                disableSortBy: true,
                Cell:
                    (row) => {
                        return <ButtonGroup>
                            < Button variant="warning" as={Link} to={`/edit_restaurants/${row.data[row.row.index].id}`} > Edit </Button>
                            < Button variant="danger" onClick={() => deleteRestaurant(row.data[row.row.index].id)} > Delete </Button>
                        </ButtonGroup>
                    }
            }

        ]
    }, [])

    return (
        <Container className="py-3">
            {data && <SortableTable columns={columns} data={data} />}
        </Container>
    )
}

export default EditRestaurantsPage