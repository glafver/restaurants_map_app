import { useState } from 'react'
import FsLightbox from 'fslightbox-react'
import Card from 'react-bootstrap/Card'

const ImageCard = ({ photo }) => {
	const [toggler, setToggler] = useState(false)

	return (
		<>
			<FsLightbox
				toggler={toggler}
				sources={[
					<img src={photo.url} />
				]}
			/>
			<Card >
				<Card.Img src={photo.url} onClick={() => setToggler(!toggler)} />
			</Card>
		</>
	)
}

export default ImageCard
