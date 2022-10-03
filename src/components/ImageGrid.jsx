import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

const ImageGrid = ({ photos }) => {

	const columnsCountBreakPoints = { 350: 1, 750: 2, 900: 3 };

	return (
		<>
			{photos &&
				<ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints} className="m-3">
					<Masonry gutter='10px'>
						{photos.map((photo) => (
							<img src={photo.url} key={photo.id} />
						))}
					</Masonry>
				</ResponsiveMasonry>
			}

		</>
	)
}

export default ImageGrid
