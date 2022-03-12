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
const Crowdfunding = React.lazy(() =>
	import("./components/CreateCrowdfunding")
);
const UserCrowdfunding = React.lazy(() => import("./pages/Crowdfunding"));
const Campaign = React.lazy(() => import("./pages/Campaign"));
const CreateCampaign = React.lazy(() => import("./pages/CreateCampaign"));

const Token = React.lazy(() => import("./pages/Token"));
const Company = React.lazy(() => import("./pages/Company"));
const Features = React.lazy(() => import("./pages/Features"));
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
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
						<Route
							path="/Campaign"
							exact
							element={isAuthenticated ? <Campaign /> : <Navigate to="/" />}
						/>
						<Route
							path="/createCampaign"
							exact
							element={
								isAuthenticated ? <CreateCampaign /> : <Navigate to="/" />
							}
						/>
						<Route
							path="/Crowdfunding"
							exact
							element={isAuthenticated ? <Crowdfunding /> : <Navigate to="/" />}
						/>
						<Route
							path="/UserCrowdfunding"
							exact
							element={
								isAuthenticated ? <UserCrowdfunding /> : <Navigate to="/" />
							}
						/>
						<Route
							path="/Crowdfunding/:tokenID"
							element={isAuthenticated ? <Token /> : <Navigate to="/" />}
						/>
						<Route
							path="/assistance"
							element={isAuthenticated ? <Assistance /> : <Navigate to="/" />}
						/>
						<Route
							path="/dashboard"
							element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />}
						>
						</Route>
					</Routes>
				</Suspense>
				<Footer />
			</div>
		</Router>
	);
};

export default App;
