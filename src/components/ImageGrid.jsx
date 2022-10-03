

const ImageGrid = ({ photos }) => {

	return (
		<>
			<div className="d-flex col-12 flex-wrap mt-5 justify-content-center">
				{photos && photos.map((photo) => (
					<div className="col-lg-2 col-md-3 col-xs-6 " key={photo.id}>
						<div className="m-2" style={{ paddingBottom: '100%', backgroundImage: `url(${photo.url})`, backgroundSize: 'cover' }}></div>
					</div>
				))
				}

			</div>
		</>
	)
}

export default ImageGrid
