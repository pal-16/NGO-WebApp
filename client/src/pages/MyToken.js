import Api from "../utils/Api/Api.js";
import React, { useEffect, useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "../components/InputTag/InputTag.css"
import { oneETH } from "../constants"
import { toast } from "react-toastify"
import Loader from "../components/Loader/Loader"
const MyToken = () => {
	const [isLoading, setisLoading] = useState(true);
	const [temp] = useState(localStorage.getItem("user"));
	var user = (JSON.parse(temp))
	const { tokenID } = useState(user.token);
	var certi = [];
	const [token, setToken] = useState([]);
	const [form, setForm] = useState({
		name: user.name,
		email: user.email,
		country: '',
		ethereumAddress: '',
		keynotes: '',
		awardsAndAccolades: '',
		mobile: '',
		gender: '',
		dateOfBirth: '',
		password: '',
		certificates: [],
		image: '',
		sport: '',
		degreeOfPlay: '',
		collegeInfo: '',
		tokenIndex: '',
		instagramLink: '',
		twitterLink: '',
		amount: '',
		rate: '',
		facebookLink: '',
		youtubeLink: ''
	});

	const handleChange = e => {
		const { name, value } = e.target;
		setForm(form => ({
			...form,
			[name]: value
		}));
	};
	const handleSubmit = async (e) => {
		e.preventDefault()
		form.awardsAndAccolades = tags;
		form.rate = form.rate * oneETH;
		console.log(form)
		try {
			if (token.approved) {
				const response = await Api.token.editTokenDetails(form);
				toast.success("Your token details have been edited")
				console.log(response);
			}
			else {
				const response = await Api.token.proposeToken(form);
				toast.success("Your token has been proposed")
				console.log(response);
			}
		}
		catch (error) {
			console.log(error);
		}

	}
	const handleProfileImage = (e) => {
		let reader = new FileReader();
		reader.readAsDataURL(e.target.files[0]);
		reader.onload = function () {
			form.image = reader.result;
		};

	}
	const fileSelectedHandler = (e) => {
		console.log(form)
		for (var i = 0; i < e.target.files.length; i++) {
			console.log(i)
			var file = e.target.files[i];
			let reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = function () {
				certi.push(reader.result);
			};
			reader.onerror = function (error) {
				console.log('Error: ', error);
			};
		}
		form.certificates = certi;
	}
	// Using the State hook to declare our tags variable and setTags to update the variable.
	const [tags, setTags] = useState([

	]);
	const removeTag = (i) => {
		const newTags = [...tags];
		newTags.splice(i, 1);

		// Call the defined function setTags which will replace tags with the new value.
		setTags(newTags);
	};
	var tagInput = null;
	const [approved, setApproved] = useState(false);
	const inputKeyDown = (e) => {
		var val = e.target.value;
		console.log(e.key)
		if (e.key === ',' && val) {
			console.log(val)
			val = val.replace(",", "");

			if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
				return;
			}
			setTags([...tags, val]);
			console.log(tags)

			tagInput.value = "";
		} else if (e.key === 'Backspace' && !val) {
			removeTag(tags.length - 1);
		}
	};
	useEffect(() => {
		const init = async () => {
			if (user.token !== undefined) {
				try {
					const response = await Api.token.getToken(user.token);
					const { token } = response.data;
					console.log(token);
					setToken({
						...token,
					});
					console.log(token)
					var div = document.getElementById("isApproved");
					var div2 = document.getElementById("notApproved");

					if (token.approved === true) {
						div.style.display = "block";
						div2.style.display = "none";
						setApproved(true);
					}
					else {
						div.style.display = "none";
						div2.style.display = "block";
						setApproved(false);
					}
					var date = token.dateOfBirth.split('T')[0];
					setForm({
						...token,
						name: token.name,
						email: token.email,
						country: token.country,
						ethereumAddress: token.ethereumAddress,
						awardsAndAccolades: token.awardsAndAccolades,
						gender: token.gender,
						dateOfBirth: date,
						certificates: token.certificates,
						image: token.image,
						degreeOfPlay: token.degreeOfPlay,
						collegeInfo: token.collegeInfo,
						tokenIndex: token.tokenIndex,
						instagramLink: token.instagramLink,
						twitterLink: token.twitterLink,
						facebookLink: token.facebookLink,
						sport: token.sport,
						keynotes: token.keynotes,
						mobile: token.mobile,
						amount: token.amount,
						rate: token.rate / oneETH,
						youtubeLink: token.youtubeLink
					});
					setTags(token.awardsAndAccolades);
					certi = token.certificates;
					console.log(form)

					// setTokenIndex(token.tokenIndex);
				} catch (error) {
					console.log(error);
				}
			}
		};
		setisLoading(false)
		return init();
	}, [tokenID]);

	return isLoading ? (
		<Loader />
	) : (
		<>
			<div className="text-gray-600 lg:mx-20 sm:mx-0">

				<form action="#" method="POST" onSubmit={handleSubmit}>
					<div className="p-10 mt-10 bg-gray-100 rounded-xl">
						<div id="isApproved" style={{ display: "none", color: "green", border: "1px solid green", padding: "10px", margin: "10px" }} >Your Token is now Live</div>
						<div id="notApproved" style={{ color: "red", border: "1px solid red", padding: "10px", margin: "10px" }}>Your Token is not yet Live, fill the below form and save to propose the token</div>

						<Card sx={{ padding: 5 }}>
							<div style={{ width: '30%', float: 'left' }}>
								<CardMedia
									component="img"
									height="140"
									image={form.image}
									alt=""
								/>
							</div>
							<div style={{ width: '60%', float: 'left', margin: '10px' }}>
								<CardContent sx={{ align: 'left' }} >
									<Typography gutterBottom variant="h5" component="div">
										{form.name}

									</Typography>
									<Typography variant="body2 h" gutterBottom color="text.secondary">
										Sport: {form.sport} & Country: {form.country}
									</Typography>
								</CardContent>
							</div>
						</Card>
					</div>
					<div className="p-10 mt-10 bg-gray-100 rounded-xl">
						<div className="md:grid md:grid-cols-3 md:gap-6">
							<div className="md:col-span-1">
								<div className="px-4 sm:px-0">
									<h3 className="text-lg font-medium leading-6 text-gray-900">Profile</h3>
									<p className="mt-1 text-sm text-gray-600">
										This information will be displayed publicly so be careful what you share.
									</p>
								</div>
							</div>
							<div className="mt-5 md:mt-0 md:col-span-2">
								<div className="shadow sm:rounded-md sm:overflow-hidden">
									<div className="px-4 py-5 bg-white space-y-6 sm:p-6">
										<div className="grid grid-cols-3 gap-6">
											<div className="col-span-3 sm:col-span-2">
											</div>
										</div>
										<div>
											<label htmlFor="about" className="block text-sm font-medium text-gray-700">
												Key Note for Investors
											</label>
											<div className="mt-1">
												<textarea
													id="keynotes"
													name="keynotes"
													rows={3}
													className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md px-1 py-3 border"
													placeholder="you@example.com"
													onChange={(e) => setForm({ ...form, keynotes: e.target.value })}
													value={form.keynotes}
												/>
											</div>
											<p className="mt-2 text-sm text-gray-500">
												Brief description for your profile. URLs are hyperlinked.
											</p>
										</div>
										<div>
											<label className="block text-sm font-medium text-gray-700">Profile Photo</label>
											<div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
												<div className="space-y-1 text-center">
													<svg
														className="mx-auto h-12 w-12 text-gray-400"
														stroke="currentColor"
														fill="none"
														viewBox="0 0 48 48"
														aria-hidden="true"
													>
														<path
															d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
															strokeWidth={2}
															strokeLinecap="round"
															strokeLinejoin="round"
														/>
													</svg>
													<div className="flex text-sm text-gray-600">
														<label
															htmlFor="image"
															className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
														>
															<span>Upload a file</span>
															<input id="image" name="image" type="file" className="sr-only" defaultValue={form.image} onChange={handleProfileImage} />
														</label>
														<p className="pl-1">or drag and drop</p>
													</div>
													<p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="p-10 mt-10 bg-gray-100 rounded-xl">
						<div className="md:grid md:grid-cols-3 md:gap-6">
							<div className="md:col-span-1">
								<div className="px-4 sm:px-0">
									<h3 className="text-lg font-medium leading-6 text-gray-900">Personal Information</h3>
									<p className="mt-1 text-sm text-gray-600">This information will be displayed publicly so be careful what you share.</p>
								</div>
							</div>
							<div className="mt-5 md:mt-0 md:col-span-2">
								<div className="shadow overflow-hidden sm:rounded-md">
									<div className="px-4 py-5 bg-white sm:p-6">
										<div className="grid grid-cols-6 gap-6">
											<div className="col-span-6 sm:col-span-3">
												<label htmlFor="name" className="block text-sm font-medium text-gray-700">
													Name
												</label>
												<input
													type="text"
													name="name"
													id="name"
													autoComplete="name"
													required
													value={form.name}
													onChange={(e) => setForm({ ...form, name: e.target.value })}

													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
												/>
											</div>

											<div className="col-span-6 sm:col-span-4">
												<label htmlFor="email-address" className="block text-sm font-medium text-gray-700">
													Email address
												</label>
												<input
													type="text"
													name="email-address"
													id="email-address"
													autoComplete="email"
													defaultValue={form.email}
													onChange={handleChange}
													required
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
												/>
											</div>
											<div className="col-span-6 sm:col-span-3">
												<label htmlFor="mobile" className="block text-sm font-medium text-gray-700">
													Mobile
												</label>
												<input
													type="text"
													name="mobile"
													id="mobile"
													required
													autoComplete="mobile"
													defaultValue={form.mobile}
													onChange={handleChange}
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
												/>
											</div>
											<div className="col-span-6 sm:col-span-3">
												<label htmlFor="country" className="block text-sm font-medium text-gray-700">
													Country
												</label>
												<input
													type="text"
													name="country"
													id="country"
													autoComplete="country"
													required
													defaultValue={form.country}
													onChange={handleChange}
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
												/>
											</div>

											<div className="col-span-6 sm:col-span-3">
												<label htmlFor="ethereumAddress" className="block text-sm font-medium text-gray-700">
													Ethereum address
												</label>
												<input
													type="text"
													name="ethereumAddress"
													id="ethereumAddress"
													autoComplete="ethereumAddress"
													defaultValue={form.ethereumAddress}
													required
													onChange={handleChange}
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
												/>
											</div>

											<div className="col-span-6 sm:col-span-3">
												<label htmlFor="gender" className="block text-sm font-medium text-gray-700">
													Gender
												</label>
												<select
													id="gender"
													name="gender"
													autoComplete="gender"
													value={form.gender}
													onChange={handleChange}
													className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
												>
													<option value="" >Choose Option</option>

													<option value="Male" >Male</option>
													<option value="Female">Female</option>
													<option value="Other">Other</option>
													<option value="PreferNotToSay">Prefer Not to Say</option>
												</select>
											</div>

											<div className="col-span-6 sm:col-span-3 lg:col-span-2">
												<label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
													Date of Birth
												</label>

												<input
													type="date"
													name="dateOfBirth"
													required
													id="dateOfBirth"
													autoComplete="dateOfBirth"
													defaultValue={form.dateOfBirth}
													onChange={handleChange}
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
												/>
											</div>


										</div>
									</div>

								</div>
							</div>
						</div>
					</div>
					<div className="p-10 mt-10 bg-gray-100 rounded-xl">
						<div className="md:grid md:grid-cols-3 md:gap-6">
							<div className="md:col-span-1">
								<div className="px-4 sm:px-0">
									<h3 className="text-lg font-medium leading-6 text-gray-900">Career Information</h3>
									<p className="mt-1 text-sm text-gray-600">To ensure the better investments, make sure to enter all details.</p>
								</div>
							</div>
							<div className="mt-5 md:mt-0 md:col-span-2">
								<div className="shadow overflow-hidden sm:rounded-md">
									<div className="px-4 py-5 bg-white sm:p-6">
										<div className="grid grid-cols-6 gap-6">
											<div className="col-span-6 sm:col-span-3">
												<label htmlFor="name" className="block text-sm font-medium text-gray-700">
													Educational Information
												</label>
												<input
													type="text"
													name="collegeInfo"
													id="collegeInfo"
													autoComplete="collegeInfo"
													defaultValue={form.collegeInfo}
													required
													onChange={handleChange}
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
												/>
											</div>

											<div className="col-span-6 sm:col-span-3">
												<label htmlFor="sport" className="block text-sm font-medium text-gray-700">
													Sport Played
												</label>
												<input
													type="text"
													name="sport"
													id="sport"
													autoComplete="sport"
													defaultValue={form.sport}
													onChange={handleChange}
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
												/>
											</div>

											<div className="col-span-6 sm:col-span-3">
												<label htmlFor="awardsAndAccolades" className="block text-sm font-medium text-gray-700">
													Awards and Accolodes
												</label>
												<div className="input-tag">
													<ul className="input-tag__tags">
														{tags.map((tag, i) => (
															<li key={tag}>
																{tag}
																<button type="button" onClick={() => { removeTag(i); }}>+</button>
															</li>
														))}
														<li className="input-tag__tags__input"><input type="text" onKeyDown={inputKeyDown} ref={c => { tagInput = c; }} /></li>
													</ul>
												</div>

											</div>



											<div className="col-span-6 sm:col-span-3">
												<label htmlFor="degreeOfPlay" className="block text-sm font-medium text-gray-700">
													Degree Of Play
												</label>
												<select
													id="degreeOfPlay"
													name="degreeOfPlay"
													autoComplete="degreeOfPlay"
													value={form.degreeOfPlay}
													required
													onChange={handleChange}
													className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
												>
													<option value="District">District</option>
													<option value="State">State</option>
													<option value="National">National</option>
													<option value="International">International</option>
												</select>
											</div>

											<div className="col-span-6 sm:col-span-3 lg:col-span-2">
												<label htmlFor="certificate" className="block text-sm font-medium text-gray-700">
													Certificate
												</label>
												<input
													type="file"
													name="certificates"
													id="certificates"
													multiple
													autoComplete="certificates"
													defaultValue={form.certificates}
													onChange={fileSelectedHandler}
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
												/>
											</div>


										</div>
									</div>

								</div>
							</div>
						</div>
					</div>
					<div className="p-10 mt-10 bg-gray-100 rounded-xl">
						<div className="md:grid md:grid-cols-3 md:gap-6">
							<div className="md:col-span-1">
								<div className="px-4 sm:px-0">
									<h3 className="text-lg font-medium leading-6 text-gray-900">Socail Media Engagement</h3>
									<p className="mt-1 text-sm text-gray-600">To ensure the better investments, make sure to enter all details.</p>
								</div>
							</div>
							<div className="mt-5 md:mt-0 md:col-span-2">
								<div className="shadow overflow-hidden sm:rounded-md">
									<div className="px-4 py-5 bg-white sm:p-6">
										<div className="grid grid-cols-6 gap-6">
											<div className="col-span-6 sm:col-span-3">
												<label htmlFor="instagramLink" className="block text-sm font-medium text-gray-700">
													Instagram Link
												</label>
												<input
													type="text"
													name="instagramLink"
													id="instagramLink"
													autoComplete="instagramLink"
													defaultValue={form.instagramLink}
													onChange={handleChange}
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
												/>
											</div>

											<div className="col-span-6 sm:col-span-3">
												<label htmlFor="youtubeLink" className="block text-sm font-medium text-gray-700">
													Youtube Link
												</label>
												<input
													type="text"
													name="youtubeLink"
													id="youtubeLink"
													autoComplete="youtubeLink"
													defaultValue={form.youtubeLink}
													onChange={handleChange}
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
												/>
											</div>
											<div className="col-span-6 sm:col-span-3">
												<label htmlFor="facebookLink" className="block text-sm font-medium text-gray-700">
													Facebook Link
												</label>
												<input
													type="text"
													name="facebookLink"
													id="facebookLink"
													autoComplete="facebookLink"
													defaultValue={form.facebookLink}
													onChange={handleChange}
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
												/>
											</div>
											<div className="col-span-6 sm:col-span-3">
												<label htmlFor="twitterLink" className="block text-sm font-medium text-gray-700">
													Twitter Link
												</label>
												<input
													type="text"
													name="twitterLink"
													id="twitterLink"
													autoComplete="twitterLink"
													defaultValue={form.twitterLink}
													onChange={handleChange}
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
												/>
											</div>









										</div>
									</div>

								</div>
							</div>
						</div>
					</div>

					<div className="p-10 mt-10 bg-gray-100 rounded-xl">

						<div className="md:grid md:grid-cols-3 md:gap-6">
							<div className="md:col-span-1">
								<div className="px-4 sm:px-0">
									<h3 className="text-lg font-medium leading-6 text-gray-900">Token Details</h3>
									<p className="mt-1 text-sm text-gray-600">Enter the amount according to the investment you need</p>
								</div>
							</div>
							<div className="mt-5 md:mt-0 md:col-span-2">
								<div className="shadow overflow-hidden sm:rounded-md">
									<div className="px-4 py-5 bg-white sm:p-6">
										<div className="grid grid-cols-6 gap-6">
											<div className="col-span-6 sm:col-span-3">
												<label htmlFor="rate" className="block text-sm font-medium text-gray-700">
													Rate
												</label>
												<input
													type="number"
													name="rate"
													id="rate"
													autoComplete="rate"
													defaultValue={form.rate}
													onChange={handleChange}
													required
													disabled={approved}
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
												/>
											</div>

											<div className="col-span-6 sm:col-span-3">
												<label htmlFor="amount" className="block text-sm font-medium text-gray-700">
													Total Supply of Coins
												</label>
												<input
													type="number"
													name="amount"
													id="amount"
													autoComplete="amount"
													defaultValue={form.amount}
													required
													onChange={handleChange}
													disabled={approved}
													className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md px-1 py-3 border"
												/>
											</div>


										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
						<button
							type="submit"
							className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</>
	)
}

export default MyToken;