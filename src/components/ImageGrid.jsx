import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ImageCard from './ImageCard'

const ImageGrid = ({ photos }) => {
	console.log(photos)

	return (
		<Row xs={1} sm={2} md={3} lg={4} className='m-3 justify-content-center' >
			{photos && photos.map(photo => (
				<Col key={photo.id} className="d-flex mb-4">
					<ImageCard photo={photo} />
				</Col>
			))}
		</Row>
	)
}

export default ImageGrid
