// rafce: Shortcut to create a component
// impt: Shortcut to import PropTypes

// yarn build or npm run build: when ready to deploy
// npm i -g serve
// serve -s build -p 8000

// npm i json-server
// add --- "server": "json-server --watch db.json --port 5000" --- to the scripts object in package.json
// http://localhost:5000/tasks.

// npm i react-router-dom

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header.js";
import Tasks from "./components/Tasks.js";
import AddTask from "./components/AddTask.js";
import Footer from "./components/Footer.js";
import About from "./components/About.js";

const App = () => {
    const [showAddTask, setShowAddTaks] = useState(false);

    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const getTasks = async () => {
            const tasksFromServer = await fetchTasks();
            setTasks(tasksFromServer);
        };

        getTasks();
    }, []);

    // Fetch Tasks
    const fetchTasks = async () => {
        const res = await fetch("http://localhost:5000/tasks");
        const data = await res.json();

        return data;
    };

    // Fetch Task
    const fetchTask = async (taskId) => {
        const res = await fetch(`http://localhost:5000/tasks/${taskId}`);
        const data = await res.json();

        return data;
    };

    // Add Task
    const addTask = async (task) => {
        const res = await fetch(`http://localhost:5000/tasks`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        const data = await res.json();

        setTasks([...tasks, data]);
    };

    // Delete Task
    const deleteTask = async (taskId) => {
        await fetch(`http://localhost:5000/tasks/${taskId}`, {
            method: "DELETE",
        });

        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    // Toggle Reminder
    const toggleReminder = async (taskId) => {
        const task = await fetchTask(taskId);
        const updTask = { ...task, reminder: !task.reminder };

        const res = await fetch(`http://localhost:5000/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updTask),
        });

        const data = await res.json();

        setTasks(
            tasks.map((task) =>
                task.id === taskId ? { ...task, reminder: data.reminder } : task
            )
        );
    };

    return (
        <Router>
            <div className="container">
                <Header
                    title="Task Tracker"
                    onAdd={() => setShowAddTaks(!showAddTask)}
                    showAdd={showAddTask}
                />

                <Route
                    path="/"
                    exact
                    render={(props) => (
                        <>
                            {showAddTask && <AddTask onAdd={addTask} />}

                            {tasks.length > 0 ? (
                                <Tasks
                                    tasks={tasks}
                                    onDelete={deleteTask}
                                    onToggle={toggleReminder}
                                />
                            ) : (
                                "No Tasks to Show"
                            )}
                        </>
                    )}
                />
                <Route path="/about" component={About} />
                <Footer />
            </div>
        </Router>
    );
};

export default App;
