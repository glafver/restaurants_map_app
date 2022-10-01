import { useCallback, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import ProgressBar from 'react-bootstrap/ProgressBar'
import { useDropzone } from 'react-dropzone'
import useUploadPhotos from '../hooks/useUploadPhotos'
import { Button } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext'

const UploadPhotos = ({ restaurant_id }) => {

	const { isAdmin } = useAuthContext()

	const [info, setInfo] = useState(null)

	const uploadPhotos = useUploadPhotos()

	const onDrop = useCallback((acceptedFiles) => {
		if (!acceptedFiles.length) {
			return
		}
		setInfo(null)
		acceptedFiles.forEach(file => {
			uploadPhotos.upload(file, restaurant_id)
		})
	}, [])

	const onDropRejected = useCallback((test) => {
		setInfo(test[0].errors[0].message)
	}, [])

	const { getRootProps, getInputProps } = useDropzone({
		accept: {
			'image/gif': [],
			'image/jpeg': [],
			'image/png': [],
			'image/webp': [],
		},
		maxFiles: 5,
		maxSize: 4 * 1024 * 1024,
		onDrop,
		onDropRejected
	})

	return (
		<>
			<div {...getRootProps()} id="dropzone-wrapper" >
				<input {...getInputProps()} />
				<Button variant="primary" className="m-3" onClick={() => { setInfo(null) }}>
					Upload photos
				</Button>

				{/* Upload Progress Bar */}
				{uploadPhotos.progress !== null || uploadPhotos.progress == 100 && (
					<ProgressBar
						variant='success'
						animated
						now={uploadPhotos.progress}
						label={`${uploadPhotos.progress}%`}
					/>
				)}

				{info && <Alert variant='danger'>{info}</Alert>}
				{uploadPhotos.isError && <Alert variant='danger'>Failed to upload files</Alert>}
				{uploadPhotos.isSuccess && !isAdmin && <Alert variant="success">Your photos uploaded and will be rewied by admin</Alert>}
				{uploadPhotos.isSuccess && isAdmin && <Alert variant="success">Your photos uploaded</Alert>}
			</div>
		</>
	)
}

export default UploadPhotos
