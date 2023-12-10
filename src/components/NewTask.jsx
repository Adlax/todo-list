import React, { useState } from "react";

const NewTask = ({ ...rest }) => {
	// console.log(rest);
	const { handleAddTask, handleDeleteTask } = rest;
	const [inputTask, setInputTask] = useState("");

	const handleChange = (evt) => {
		setInputTask((oldState) => evt.target.value);
	};

	const localHandleAddTask = () => {
		if (inputTask.trim() === "") {
			return;
		}
		setInputTask("");
		handleAddTask(inputTask);
	};

	return (
		<div className="flex items-center gap-4">
			<input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" onChange={handleChange} value={inputTask} />
			<button className="text-stone-700 hover:text-stone-950" onClick={localHandleAddTask}>
				Add
			</button>
		</div>
	);
};

export default NewTask;
