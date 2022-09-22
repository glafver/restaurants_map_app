import { Routes, Route } from 'react-router-dom'
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
import './assets/scss/App.scss'
import SuggestNewRestaurantPage from "./pages/SuggestNewRestaurantPage";
import "./assets/scss/App.scss";
import RestaurantPage from "./pages/RestaurantPage";

function App() {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="*" element={<NotFound />} />

				<Route path="/signup" element={<SignupPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/logout" element={<LogoutPage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />

				<Route path="/users" element={
					<RequireAdminAuth>
						<UsersPage />
					</RequireAdminAuth>
				} />

				<Route path="/update-profile" element={
					<RequireAuth>
						<UpdateProfilePage />
					</RequireAuth>
				} />
				<Route path="/restaurant/id" element={<RestaurantPage />} />
				<Route path="/suggest" element={<SuggestNewRestaurantPage />} />
			</Routes>
		</div>
	);
}

export default App

