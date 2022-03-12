import {
	BrowserRouter as Router,
	Route,
	Routes,
	Navigate,
} from "react-router-dom";
import React, { Suspense, useState, useEffect } from "react";
import { isLoggedIn } from "./utils/jwtUtil";
import Header from "./components/Partials/Header";
import Footer from "./components/Partials/Footer";
import Loader from "./components/Loader/Loader";

const Home = React.lazy(() => import("./pages/Home"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Token = React.lazy(() => import("./pages/Token"));
const Company = React.lazy(() => import("./pages/Company"));
const Features = React.lazy(() => import("./pages/Features"));
const MyToken = React.lazy(() => import("./pages/MyToken"));

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());

	useEffect(() => {
		if (isLoggedIn()) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
			localStorage.removeItem("token");
		}
	}, []);

	return (
		<Router>
			<div className="App">
				<Header
					isAuthenticated={isAuthenticated}
					setIsAuthenticated={setIsAuthenticated}
				/>
				<Suspense fallback={<Loader />}>
					<Routes>
						<Route
							path="/"
							exact
							element={
								<Home
									isAuthenticated={isAuthenticated}
									setIsAuthenticated={setIsAuthenticated}
								/>
							}
						/>
						<Route path="/company" exact element={<Company />} />
						<Route path="/features" exact element={<Features />} />
						<Route path="/dashboard" exact element={<Dashboard />} />
						<Route path="/marketplace/:tokenID" element={<Token />} />
						<Route
							path="/myToken"
							element={isAuthenticated ? <MyToken /> : <Navigate to="/" />}
						/>
					</Routes>
				</Suspense>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
