import React, { Component } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

class App extends Component {
    state = {
        showTaskForm: false,
        tasks: [],
    };

    setShowTaskForm = (showTaskForm) => {
        this.setState({ showTaskForm: !showTaskForm });
    };

    // Fetch Tasks
    fetchTasks = async () => {
        const res = await fetch("http://localhost:5000/tasks");
        const data = await res.json();

        this.setState({ tasks: data });
    };

    // Fetch Task
    fetchTask = async (taskId) => {
        const res = await fetch(`http://localhost:5000/tasks/${taskId}`);
        const data = await res.json();

        return data;
    };

    // Add Task
    addTask = async (task) => {
        const res = await fetch("http://localhost:5000/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(task),
        });

        const newTask = await res.json();

        this.setState({ tasks: [...this.state.tasks, newTask] });
    };

    // Delete Task
    deleteTask = async (taskId) => {
        await fetch(`http://localhost:5000/tasks/${taskId}`, {
            method: "DELETE",
        });

        const tasks = this.state.tasks.filter((task) => task.id !== taskId);
        this.setState({ tasks: tasks });
    };

    // Toggle Reminder
    toggleReminder = async (taskId) => {
        const task = await this.fetchTask(taskId);
        const updatedTask = { ...task, reminder: !task.reminder };

        const res = await fetch(`http://localhost:5000/tasks/${taskId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTask),
        });

        const data = await res.json();

        const tasks = this.state.tasks.map((task) =>
            task.id === taskId ? { ...task, reminder: data.reminder } : task
        );

        this.setState({ tasks: tasks });
    };

    componentDidMount() {
        this.fetchTasks();
    }

    render() {
        return (
            <div className="container">
                <Header
                    title="Task Tracker"
                    showAdd={this.state.showTaskForm}
                    onAdd={() => this.setShowTaskForm(this.state.showTaskForm)}
                />

                {this.state.showTaskForm && <AddTask onAdd={this.addTask} />}

                {this.state.tasks.length > 0 ? (
                    <Tasks
                        tasks={this.state.tasks}
                        onToggle={this.toggleReminder}
                        onDelete={this.deleteTask}
                    />
                ) : (
                    "No Tasks to show"
                )}
            </div>
        );
    }
}

export default App;
