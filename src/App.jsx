import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";
import NoProject from "./components/NoProject";
import { nanoid } from "nanoid";

const App = () => {
	// selectedProjectId will be undefined initialy, then if we add new one its null, and if we read one existing its an id
	const [projectsState, setProjectsState] = useState({
		selectedProjectId: undefined,
		projects: [],
	});

	const handleNewProject = () => {
		// console.log("New Project");
		setProjectsState((oldState) => ({
			...oldState,
			selectedProjectId: null,
		}));
	};

	const saveProject = (projectData) => {
		// console.log("Save Project");
		const newProject = { ...projectData, id: nanoid() };
		setProjectsState((oldState) => ({
			...oldState,
			projects: [...oldState.projects, newProject],
			selectedProjectId: undefined,
		}));
	};

	let content;

	if (projectsState.selectedProjectId === null) {
		content = <NewProject saveProject={saveProject} />;
	} else if (projectsState.selectedProjectId === undefined) {
		content = <NoProject handleNewProject={handleNewProject} />;
	}

	console.log(projectsState);

	return (
		<main className="h-screen my-8 flex gap-8">
			<Sidebar handleNewProject={handleNewProject} projects={projectsState.projects} />
			{content}
		</main>
	);
};

export default App;
