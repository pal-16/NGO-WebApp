import { useState } from "react";
import Input from "../components/Input";
import { toast } from "react-toastify";
import { responseErrorHandler } from "../utils/Api/Api.js";
import SC from "../utils/smartContractUtil.js";
import Loader from "../components/Loader/Loader";

const Polls = ({ tokenIndex }) => {
	const initialFields = {
		question: "",
		answers: [""],
	};

	const [isLoading, setIsLoading] = useState(true);
	const [fields, setfields] = useState(initialFields);

	function onInputChange(event) {
		const { value, id: name } = event.target;
		let newFields = { ...fields };

		if (name === "question") {
			newFields[name] = value;
		}

		if (name.includes("answer")) {
			const fieldName = name.split("-")[0];
			const fieldIndex = name.split("-")[1];

			newFields[fieldName][fieldIndex] = value;
		}

		setfields(newFields);
	}

	function renderFields(fields) {
		return fields.answers.map((el, index) => (
			<div key={index} className="grid grid-cols-2">
				<Input
					id={`answers-${index}`}
					type="text"
					onChange={onInputChange}
					value={el}
					placeholder="Choose a option..."
				/>
				<button
					onClick={(e) => {
						handleRemoveField(e, index);
					}}
					className="flex mb-4 m-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-800 rounded"
				>
					Remove
				</button>
			</div>
		));
	}

	function handleAddField(event) {
		event.preventDefault();

		const newFields = { ...fields };

		newFields.answers.push("");

		setfields(newFields);
	}

	function handleRemoveField(e, index) {
		e.preventDefault();

		let newFields = { ...fields };
		newFields.answers = newFields.answers.splice(index, 1);

		setfields(newFields);
	}

	const createPoll = async () => {
		const toastElement = toast.loading("Creating a new Poll");
		try {
			console.log(tokenIndex, fields.question, fields.answers);
			await SC.createPoll(tokenIndex, fields.question, fields.answers);
			toast.update(toastElement, {
				render: "Poll created Successfully",
				type: "success",
				isLoading: false,
				autoClose: true,
			});
			setIsLoading(false);
		} catch (error) {
			responseErrorHandler(error, toastElement);
		}
	};

	return isLoading ? (
		<Loader />
	) : (
		<section className="bg-gray-100 mt-10 p-6 rounded-lg">
			<div>
				<button
					onClick={createPoll}
					className="text-centermt-2 mb-2 flex m-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800 rounded font-semibold"
				>
					CREATE A POLL
				</button>
				<form>
					<div className="m-4 xl:w-full md:w-full p-4">
						<div className="flex">
							<Input
								id="question"
								type="text"
								value={fields.question}
								onChange={onInputChange}
								label="Enter your question here"
							/>
						</div>
						<div className="flex flex-col justify-center">
							<label className="leading-7 text-md text-gray-600">
								Answer Options
							</label>
							{renderFields(fields)}
						</div>
					</div>
					<button
						className="mt-2 mb-2 flex m-auto text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-800 rounded"
						onClick={handleAddField}
					>
						Add Option
					</button>
				</form>
			</div>
		</section>
	);
};

export default Polls;
