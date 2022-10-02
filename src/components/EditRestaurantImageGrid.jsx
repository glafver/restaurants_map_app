import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import EditRestaurantImageCard from './EditRestaurantImageCard'

const EditRestaurantImageGrid = ({ photos }) => {

	return (
		<Row xs={1} sm={2} md={3} lg={4} className='my-4'>
			{photos && photos.map(photo => (
				<Col key={photo.id} className="d-flex mb-4">
					<EditRestaurantImageCard photo={photo} />
				</Col>
			))}
		</Row>
	)
}

export default EditRestaurantImageGrid
