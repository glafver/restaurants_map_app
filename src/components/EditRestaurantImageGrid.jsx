import useDeletePhoto from '../hooks/useDeletePhoto'
import useApprovePhoto from '../hooks/useApprovePhoto'
import ModalImage from 'react-modal-image'
import { Button } from 'react-bootstrap'

const EditRestaurantImageGrid = ({ photos }) => {

	const { deleting, deletePhoto } = useDeletePhoto()
	const { approve } = useApprovePhoto()

	return (

		<div className="d-flex col-12 flex-wrap mt-5">
			{photos && photos.map((photo) => (
				<div className="col-lg-2 col-md-3 col-xs-6 " key={photo.id}>
					<div className="m-2" style={{ paddingBottom: '100%', backgroundImage: `url(${photo.url})`, backgroundSize: 'cover' }}>
						{/* <ModalImage
							small={photo.url}
							large={photo.url}
							className='d-none'
						/> */}
					</div>
					<div className="mx-2 mb-5">
						<Button
							disabled={deleting}
							variant="danger"
							size="sm"
							onClick={() => deletePhoto(photo)}
							className='me-2'
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
				</div>

			))
			}
		</div>
	)
}

export default EditRestaurantImageGrid
