import React, { Component } from "react";
import Task from "./Task";

class Tasks extends Component {
    render() {
        const { tasks, onToggle, onDelete } = this.props;

        return (
            <>
                {tasks.map((task) => (
                    <Task
                        key={task.id}
                        task={task}
                        onDelete={onDelete}
                        onToggle={onToggle}
                    />
                ))}
            </>
        );
    }
}

export default Tasks;
