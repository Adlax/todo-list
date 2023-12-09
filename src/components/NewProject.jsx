import React, { useRef } from "react";
import Input from "./Input";
import Modal from "./Modal";

const NewProject = ({ saveProject }) => {
	const modal = useRef();
	const inputTitle = useRef();
	const inputDescription = useRef();
	const inputDeadline = useRef();

	const handleSave = () => {
		const title = inputTitle.current.value;
		const description = inputDescription.current.value;
		const deadline = inputDeadline.current.value;
		// validation, with modal
		if (!title.trim() || !description.trim() || !deadline.trim()) {
			console.log("Missing values");
			modal.current.open();
			return;
		}
		saveProject({ title, description, deadline });
	};

	return (
		<>
			<Modal ref={modal} buttonCaption="Close">
				<h2>Invalid inputs</h2>
				<p>You forgot to enter values. Please provide values for every field.</p>
			</Modal>
			<div className="w-[35rem] mt-16">
				<menu className="flex items-center justify-end gap-4 my-4">
					<li>
						<button className="text-stone-800 hover:text-stone-950">Cancel</button>
					</li>
					<li>
						<button className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950" onClick={handleSave}>
							Save
						</button>
					</li>
				</menu>
				<div>
					<Input label="Title" ref={inputTitle} type="text" />
					<Input label="Description" isTextarea ref={inputDescription} />
					<Input label="Deadline" ref={inputDeadline} type="date" />
				</div>
			</div>
		</>
	);
};

export default NewProject;
