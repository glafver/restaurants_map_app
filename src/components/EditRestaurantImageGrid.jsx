import useDeletePhoto from '../hooks/useDeletePhoto'
import useApprovePhoto from '../hooks/useApprovePhoto'
import { Button } from 'react-bootstrap'
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Image } from 'react-bootstrap';
import useEditPhotos from '../hooks/useEditPhotos';

const EditRestaurantImageGrid = ({ id }) => {
	const [lgShow, setLgShow] = useState(false);
	const [url, setUrl] = useState('')

	const { deleting, deletePhoto } = useDeletePhoto()
	const { approve } = useApprovePhoto()

	const { data: photos } = useEditPhotos(id)

	return (

		<div className="d-flex col-12 flex-wrap mt-5 justify-content-center">
			{photos && photos.map((photo) => (
				<div className="col-lg-2 col-md-3 col-xs-6 " key={photo.id}>
					<div className="m-2" style={{ paddingBottom: '100%', backgroundImage: `url(${photo.url})`, backgroundSize: 'cover', cursor: 'pointer' }}
						onClick={() => {
							setLgShow(true)
							setUrl(photo.url)
						}}>
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
								className="custom-button"
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
			<Modal
				centered
				className='modal-dialog-centered'
				size="lg"
				show={lgShow}
				onHide={() => setLgShow(false)}
				aria-labelledby="example-modal-sizes-title-lg"

			>
				<Image style={{ maxHeight: '80vh', objectFit: 'cover' }} className='fluid' src={url} ></Image>
			</Modal>
		</div>
	)
}

export default EditRestaurantImageGrid
