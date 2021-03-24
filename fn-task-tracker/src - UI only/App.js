// rafce: Shortcut to create a component
// impt: Shortcut to import PropTypes

// npm i -g serve
// serve -s build -p 8000
// yarn build or npm run build: when ready to deploy

// npm i json-server
// add --- "server": "json-server --watch db.json --port 5000" --- to the scripts object in package.json

import { useState } from "react";
import Header from "./components/Header.js";
import Tasks from "./components/Tasks.js";
import AddTask from "./components/AddTask.js";

const App = () => {
    const [showAddTask, setShowAddTaks] = useState(false);

    const [tasks, setTasks] = useState([
        {
            id: 1,
            text: "Doctors Appointment",
            day: "Feb 5th at 2:30pm",
            reminder: true,
        },

        {
            id: 2,
            text: "Meeting at School",
            day: "Feb 6th at 1:30pm",
            reminder: true,
        },
    ]);

    // Add Task
    const addTask = (task) => {
        const id = Math.floor(Math.random() * 10000) + 1;

        const newTask = { id, ...task };
        setTasks([...tasks, newTask]);
    };

    // Delete Task
    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    // Toggle Reminder
    const toggleReminder = (taskId) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId
                    ? { ...task, reminder: !task.reminder }
                    : task
            )
        );
    };

    return (
        <div className="container">
            <Header
                title="Task Tracker"
                onAdd={() => setShowAddTaks(!showAddTask)}
                showAdd={showAddTask}
            />
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
        </div>
    );
};

export default App;
