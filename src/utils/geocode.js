// Converts a human-readable address into { lat, lng } coordinates using the
// Geocoding API. This is a separate service from the now-deprecated Places API
// and does not require loading the Maps JavaScript API or the places library.
const geocodeAddress = async (address) => {
	if (!address) {
		throw new Error("No address provided");
	}

	const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
	const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
		address
	)}&key=${apiKey}`;

	const response = await fetch(url);
	const payload = await response.json();

	if (payload.status !== "OK" || !payload.results?.length) {
		throw new Error(payload.error_message || `Geocoding failed: ${payload.status}`);
	}

	const { lat, lng } = payload.results[0].geometry.location;
	return { lat, lng };
};

export default geocodeAddress;
