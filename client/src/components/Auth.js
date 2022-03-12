import { useState } from "react";
import React from "react";
import Api, { responseErrorHandler } from "../utils/Api/Api";
import { toast } from "react-toastify";
import validator from "validator";
import Popup from "./Popup/Popup";
import Input from "./Input";
import Radio from "./Radio";
const AuthModal = ({ setIsAuthenticated, close, isSignIn, userType }) => {
	const [signIn, setSignIn] = useState(isSignIn);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [address, setAddress] = useState("");
	const [name, setName] = useState("");
	const [status, setStatus] = useState("no-disablility");

	const submit = async () => {
		if (!validator.isEmail(email)) {
			return toast.error("Invalid Email Address");
		}
		if (!signIn && name.length < 3) {
			return toast.error("Invalid Name");
		}
		if (!signIn && userType === "org" && address.length < 3) {
			return toast.error("Invalid Address");
		}
		if (password.length < 8) {
			return toast.error("Please Use A Password With Minimum Length 8");
		}
		const toastElement = toast.loading(
			signIn ? "Logging You In" : "Signing You Up"
		);
		try {
			const response = signIn
				? await Api.auth.signIn({ email, password, userType })
				: userType == "org"
					? await Api.auth.signUp({
						email,
						password,
						name,
						address,
						userType,
					})
					: await Api.auth.signUp({
						email,
						password,
						name,
						userType,
						status
					});
			toast.update(toastElement, {
				render: signIn
					? "Logd In Successfully"
					: "Account Created Successfully",
				type: "success",
				isLoading: false,
				autoClose: true,
			});
			const { token } = response.data;
			const { user } = response.data;
			console.log(user);
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(user));
			setIsAuthenticated(true);
			return close();
		} catch (error) {
			responseErrorHandler(error, toastElement);
		}
	};

	return (
		<div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 modal">
			<h2 className="text-gray-900 text-lg font-medium title-font mb-5">
				{signIn ? "Sign In" : "Register"} As A{" "}
				{userType == "org" ? "Organization" : "User"}
			</h2>
			{!signIn && <Input label="Full Name" name="name" setter={setName} />}
			<Input label="Email" type="email" setter={setEmail} />
			{!signIn && userType === "org" && <Input label="Address" name="address" setter={setAddress} />}
			{!signIn && userType === "user" && (
				<Radio
					label="Disability Status"
					value={status}
					setter={setStatus}
					options={[
						{
							label: "No Disability",
							value: "no-disability",
							name: "status",
						},
						{
							label: "Disability",
							value: "disability",
							name: "status",
						},
					]}
				/>
			)}
			<Input label="Password" type="password" setter={setPassword} />
			<button
				onClick={submit}
				className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
			>
				{signIn ? "Sign In" : "Register"}
			</button>
			<div className="text-s text-gray-500 mt-3">
				{signIn ? "Don't have an account?" : "Already have an account?"}{" "}
				<button onClick={() => setSignIn(!signIn)} className="text-indigo-500">
					{signIn ? "Register" : "Sign In"}
				</button>
			</div>
		</div>
	);
};

const Auth = ({
	setIsAuthenticated,
	isSignIn,
	className,
	userType,
	...props
}) => {
	return (
		<Popup
			Button={
				<button className={className}>
					LogIn As A {userType == "org" ? "Organization" : "User"}
				</button>
			}
			Modal={AuthModal}
			setIsAuthenticated={setIsAuthenticated}
			isSignIn={isSignIn}
			userType={userType}
			{...props}
		/>
	);
};

export default Auth;
