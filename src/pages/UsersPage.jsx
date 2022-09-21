import { useMemo } from 'react'
import Container from 'react-bootstrap/Container'
import SimpleTable from '../components/SimpleTable'
import useUsers from '../hooks/useUsers'

const UsersPage = () => {

    const { data } = useUsers()

    console.log(data)

    const columns = useMemo(() => {
        return [
            {
                Header: 'Userame',
                accessor: 'name'
            },
            {
                Header: 'E-mail',
                accessor: 'email'
            }
        ]
    }, [])

    return (
        <Container className="py-3">
            {data && <SimpleTable columns={columns} data={data} />}
        </Container>
    )
}

export default UsersPage