import { useState } from "react";
import React from "react";
import Api, { responseErrorHandler } from "../utils/Api/Api";
import { toast } from "react-toastify";
import Input from "./Input";
import { getUserId } from "../utils/jwtUtil";


const CreateCrowdfunding = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
	const [totalAmount, setTotalAmount] = useState(0);
	const orgId=getUserId();
    const submit = async () => {
		if (title.length<3) {
			return toast.error("Invalid Title");
		}
		if (description.length < 3) {
			return toast.error("Invalid Name");
		}
		if (totalAmount==0) {
			return toast.error("Invalid Total Amount");
		}
		const toastElement = toast.loading("Creating Post"
		);
	
		try {
			const response =  await Api.crowdfunding.create({
                orgId, title, description, totalAmount
            });
					
			toast.update(toastElement, {
				render: "Post Created Successfully",
				type: "success",
				isLoading: false,
				autoClose: true,
			});
		
		
		} catch (error) {
			responseErrorHandler(error, toastElement);
		}
	};

	return (
		<div className="bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 modal">
		
		
			<Input label="Title" type="title" setter={setTitle} />
		    <Input label="Description" name="description" setter={setDescription} />
            <Input label="Total Amount" name="totalAmount" setter={setTotalAmount} />

			<button
				onClick={submit}
				className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
			>
				{"Submit Post"}
			</button>
			{/* <div className="text-s text-gray-500 mt-3">
				{signIn ? "Don't have an account?" : "Already have an account?"}{" "}
				<button onClick={() => setSignIn(!signIn)} className="text-indigo-500">
					{signIn ? "Register" : "Sign In"}
				</button>
			</div> */}
		</div>
	);
};

export default CreateCrowdfunding;
