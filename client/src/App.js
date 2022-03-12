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
const Marketplace = React.lazy(() => import("./pages/Marketplace"));
const Token = React.lazy(() => import("./pages/Token"));
const Company = React.lazy(() => import("./pages/Company"));
const Features = React.lazy(() => import("./pages/Features"));
const MyToken = React.lazy(() => import("./pages/MyToken"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Polls = React.lazy(() => import("./pages/Polls"));
const Stat = React.lazy(() => import("./pages/Stat"));
const Assistance = React.lazy(() => import("./pages/Assistance"));

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(isLoggedIn());

	useEffect(() => {
		if (isLoggedIn()) {
			setIsAuthenticated(true);
		} else {
			setIsAuthenticated(false);
			localStorage.removeItem("token");
			localStorage.removeItem("user");
		}
	}, []);

	return (
		<Router>
			<div className="App" style={{ background: "white" }}>
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
						<Route path="/marketplace" exact element={<Marketplace />} />
						<Route path="/marketplace/:tokenID" element={<Token />} />
						<Route
							path="/assistance"
							element={isAuthenticated ? <Assistance /> : <Navigate to="/" />}
						/>
						<Route
							path="/myToken"
							element={isAuthenticated ? <MyToken /> : <Navigate to="/" />}
						/>
						<Route
							path="/dashboard"
							element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
						>
							<Route path="/dashboard/stat" exact element={<Stat />} />
							<Route
								path="/dashboard/polls/:tokenID"
								exact
								element={<Polls />}
							/>
							<Route path="/dashboard/MyToken" exact element={<MyToken />} />
						</Route>
					</Routes>
				</Suspense>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
