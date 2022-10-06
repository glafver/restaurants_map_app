import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { Image } from 'react-bootstrap';

const ImageGrid = ({ photos }) => {

	const [lgShow, setLgShow] = useState(false);
	const [url, setUrl] = useState('')

	return (
		<>
			<div className="d-flex col-12 flex-wrap mt-5 justify-content-center">
				{photos && photos.map((photo) => (
					<div className="col-lg-2 col-md-3 col-xs-6 " key={photo.id}>
						<div data-testid='grid-image' key={'img' + photo.id} className="m-2" style={{ paddingBottom: '100%', backgroundImage: `url(${photo.url})`, backgroundSize: 'cover', cursor: 'pointer' }}
							onClick={() => {
								setLgShow(true)
								setUrl(photo.url)
							}}></div>
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
		</>
	)
}

export default ImageGrid
