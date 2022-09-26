import { Routes, Route } from 'react-router-dom'
import './assets/scss/App.scss'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import SignupPage from './pages/SignupPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import UpdateProfilePage from './pages/UpdateProfilePage'
import UsersPage from './pages/UsersPage'
import RequireAuth from './components/RequireAuth'
import RequireAdminAuth from './components/RequireAdminAuth'
import SuggestNewRestaurantPage from "./pages/SuggestNewRestaurantPage"
import RestaurantsPage from "./pages/RestaurantsPage"
import RestaurantPage from './pages/RestaurantPage'
import CreateRestaurantPage from './pages/CreateRestaurantPage'
import { ToastContainer } from 'react-toastify'

function App() {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="*" element={<NotFound />} />

				{/* opened routes */}
				<Route path="/signup" element={<SignupPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/logout" element={<LogoutPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route path="/restaurants" element={<RestaurantsPage />} />
				<Route path="/restaurant/:id" element={<RestaurantPage />} />

				{/* routes for logged in users */}
				<Route path="/update-profile" element={<RequireAuth><UpdateProfilePage /></RequireAuth>} />
				<Route path="/suggest" element={<RequireAuth><SuggestNewRestaurantPage /></RequireAuth>} />

				{/* routes only for admins */}
				<Route path="/users" element={<RequireAdminAuth><UsersPage /></RequireAdminAuth>} />
				<Route path="/create_restaurant" element={<RequireAdminAuth><CreateRestaurantPage /></RequireAdminAuth>} />

			</Routes>

			<ToastContainer autoClose={3000} />
		</div>
	);
}

export default App

