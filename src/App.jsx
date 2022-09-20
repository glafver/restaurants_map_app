import { Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import NotFound from './pages/NotFound'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import SignupPage from './pages/SignupPage'
// import ForgotPasswordPage from './pages/ForgotPasswordPage'
// import UpdateProfilePage from './pages/UpdateProfilePage'
// import RequireAuth from './components/RequireAuth'
import './assets/scss/App.scss'

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
				{/* <Route path="/forgot-password" element={<ForgotPasswordPage />} /> */}

				{/* <Route path="/update-profile" element={
					<RequireAuth>
						<UpdateProfilePage />
					</RequireAuth>
				} /> */}
			</Routes>
		</div>
	)
}

export default App

