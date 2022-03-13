import Api from "../utils/Api/Api.js";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { responseErrorHandler } from "../utils/Api/Api.js";
import { useNavigate } from "react-router-dom";
import { CurrencyDollarIcon } from "@heroicons/react/outline";
import Popup from "../components/Popup/Popup";
import Input from "../components/Input";
import { getUserId } from "../utils/jwtUtil";

const Analytics = () => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [totalAmount, setTotalAmount] = useState(0);
	const [currentAmount, setCurrentAmount] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		let total = 0,
			current = 0;
		Api.crowdfunding.getAllPosts().then((res) => {
			console.log(res);
			total = res.data.data.allPosts.reduce((total, post) => {
				return total + post.totalAmount;
			}, 0);

			current = res.data.data.allPosts.reduce((total, post) => {
				return total + post.currentAmount;
			}, 0);

			setTotalAmount(total);
			setCurrentAmount(current);

			setPosts(res.data.data.allPosts);

			const canvas = document.getElementById("myChart").getContext("2d");
		});
		setIsLoading(false);
	}, []);

	return (
		<div>
			<div class="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
				<div class="w-full max-w-3xl">
					<div class="-mx-2 md:flex">
						<div class="w-full md:w-1/3 px-2">
							<div class="rounded-lg shadow-sm mb-4">
								<div class="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
									<div class="px-3 pt-8 pb-10 text-center relative z-10">
										<h4 class="text-sm uppercase text-gray-500 leading-tight">
											Total Campaigns Going
										</h4>
										<h3 class="text-3xl text-gray-700 font-semibold leading-tight my-3">
											{posts.length}
										</h3>
										<p class="text-xs text-green-500 leading-tight">▲ 57.1%</p>
									</div>
									<div class="absolute bottom-0 inset-x-0">
										<canvas id="chart1" height="70"></canvas>
									</div>
								</div>
							</div>
						</div>
						<div class="w-full md:w-1/3 px-2">
							<div class="rounded-lg shadow-sm mb-4">
								<div class="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
									<div class="px-3 pt-8 pb-10 text-center relative z-10">
										<h4 class="text-sm uppercase text-gray-500 leading-tight">
											Available Volunteers
										</h4>
										<h3 class="text-3xl text-gray-700 font-semibold leading-tight my-3">
											11,427
										</h3>
										<p class="text-xs text-red-500 leading-tight">▼ 42.8%</p>
									</div>
									<div class="absolute bottom-0 inset-x-0">
										<canvas id="chart2" height="70"></canvas>
									</div>
								</div>
							</div>
						</div>
						<div class="w-full md:w-1/3 px-2">
							<div class="rounded-lg shadow-sm mb-4">
								<div class="rounded-lg bg-white shadow-lg md:shadow-xl relative overflow-hidden">
									<div class="px-3 pt-8 pb-10 text-center relative z-10">
										<h4 class="text-sm uppercase text-gray-500 leading-tight">
											Fund Raised
										</h4>
										<h3 class="text-3xl text-gray-700 font-semibold leading-tight my-3">
											{totalAmount}
										</h3>
										<p class="text-xs text-green-500 leading-tight">▲ 8.2%</p>
									</div>
									<div class="absolute bottom-0 inset-x-0">
										<canvas id="chart3" height="70"></canvas>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Analytics;
