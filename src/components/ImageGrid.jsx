import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"

const ImageGrid = ({ photos }) => {

	const columnsCountBreakPoints = { 350: 1, 750: 2, 900: 3 };
	console.log(photos)

	return (
		<>
			{photos &&
				<ResponsiveMasonry columnsCountBreakPoints={columnsCountBreakPoints} className="m-4">
					<Masonry gutter={4}>
						{photos.map((photo) => (
							<img src={photo.url} />
						))}
					</Masonry>
				</ResponsiveMasonry>
			}

		</>
	)
}

export default ImageGrid
