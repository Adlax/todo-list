import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import NewProject from "./components/NewProject";
import NoProject from "./components/NoProject";
import { nanoid } from "nanoid";
import SelectedProject from "./components/SelectedProject";

const initProjects = { title: "Faire caca", description: "Demouler un gros cake", deadline: "2023-12-29", id: "Vuvuv2JQBlnE9lrnDth6R" };

const App = () => {
	// selectedProjectId will be undefined initialy, then if we add new one its null, and if we read one existing its an id
	const [projectsState, setProjectsState] = useState({
		selectedProjectId: undefined,
		projects: [initProjects],
		tasks: [],
	});

	const handleAddTask = (text) => {
		// console.log(text);
		const newTask = { text: text, id: nanoid(), projectId: projectsState.selectedProjectId };
		setProjectsState((oldState) => ({
			...oldState,
			tasks: [...oldState.tasks, newTask],
		}));
	};

	const handleDeleteTask = (id) => {
		// console.log("Delete task");
		setProjectsState((oldState) => ({
			...oldState,
			tasks: oldState.tasks.filter((task) => task.id !== id),
		}));
	};

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

	const handleCancel = () => {
		setProjectsState((oldState) => ({
			...oldState,
			selectedProjectId: undefined,
		}));
	};

	const handleSelectProject = (id) => {
		setProjectsState((oldState) => ({
			...oldState,
			selectedProjectId: id,
		}));
	};

	const handleDeleteProject = () => {
		setProjectsState((oldState) => ({
			...oldState,
			selectedProjectId: undefined,
			projects: oldState.projects.filter((proj) => proj.id !== oldState.selectedProjectId),
		}));
	};

	const selectedProject = projectsState.projects.find((proj) => proj.id === projectsState.selectedProjectId);

	let content = (
		<SelectedProject
			project={selectedProject}
			handleDeleteProject={handleDeleteProject}
			handleAddTask={handleAddTask}
			handleDeleteTask={handleDeleteTask}
			tasks={projectsState.tasks}
		/>
	);

	if (projectsState.selectedProjectId === null) {
		content = <NewProject saveProject={saveProject} handleCancel={handleCancel} />;
	} else if (projectsState.selectedProjectId === undefined) {
		content = <NoProject handleNewProject={handleNewProject} />;
	}

	// console.log(projectsState);

	return (
		<main className="h-screen my-8 flex gap-8">
			<Sidebar
				handleNewProject={handleNewProject}
				projects={projectsState.projects}
				handleSelectProject={handleSelectProject}
				selectedProjectId={projectsState.selectedProjectId}
			/>
			{content}
		</main>
	);
};

export default App;
