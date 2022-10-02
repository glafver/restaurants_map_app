import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ModalImage from 'react-modal-image'
import useDeletePhoto from '../hooks/useDeletePhoto'
import useApprovePhoto from '../hooks/useApprovePhoto'

const EditRestaurantImageCard = ({ photo }) => {
	const { deleting, deletePhoto } = useDeletePhoto()
	const { approve } = useApprovePhoto()

	return (
		<>
			{photo &&
				<Card>
					<Card.Header>
						<div className="card-actions">

							<Button
								disabled={deleting}
								variant="danger"
								size="sm"
								onClick={() => deletePhoto(photo)}
							>
								Delete
							</Button>


							{!photo.approved &&
								<Button
									variant="success"
									size="sm"
									onClick={() => approve(photo.id)}
								>
									Approve
								</Button>
							}
						</div>
					</Card.Header>

					<ModalImage
						small={photo.url}
						large={photo.url}
						className='card-img-top'
					/>

					<Card.Footer>
						{Math.round(photo.size / 1024)} kB
					</Card.Footer>
				</Card>
			}
		</>
	)
}

export default EditRestaurantImageCard
