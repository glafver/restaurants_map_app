import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import HomePage from "./pages/HomePage";
import NotFound from "./pages/NotFound";
import SuggestNewRestaurantPage from "./pages/SuggestNewRestaurantPage";
import "./assets/scss/App.scss";

function App() {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="*" element={<NotFound />} />
				<Route path="/suggest" element={<SuggestNewRestaurantPage />} />
			</Routes>
		</div>
	);
}

export default App;
