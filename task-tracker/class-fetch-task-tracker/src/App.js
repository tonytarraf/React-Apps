import React, { Component } from "react";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";

class App extends Component {
    state = {
        showTaskForm: false,

        tasks: [
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
        ],
    };

    setShowTaskForm = (showTaskForm) => {
        this.setState({ showTaskForm: !showTaskForm });
    };

    // Add Task
    addTask = (task) => {
        const id = Math.floor(Math.random() * 1000) + 1;

        const newTask = { id, ...task };
        this.setState({ tasks: [...this.state.tasks, newTask] });
    };

    // Delete Task
    deleteTask = (taskId) => {
        const tasks = this.state.tasks.filter((task) => task.id !== taskId);
        this.setState({ tasks: tasks });
    };

    // Toggle Reminder
    toggleReminder = (taskId) => {
        const tasks = this.state.tasks.map((task) =>
            task.id === taskId ? { ...task, reminder: !task.reminder } : task
        );

        this.setState({ tasks: tasks });
    };

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
