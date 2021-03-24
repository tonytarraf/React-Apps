// npm i react-icons

import React, { Component } from "react";
import { FaTimes } from "react-icons/fa";

class Task extends Component {
    render() {
        const { task, onToggle, onDelete } = this.props;

        return (
            <div
                className={`task ${task.reminder ? "reminder" : ""}`}
                onDoubleClick={() => onToggle(task.id)}
            >
                <h3>
                    {task.text}
                    <FaTimes
                        className="deleteTaskBtn"
                        title="Delete"
                        onClick={() => onDelete(task.id)}
                    />
                </h3>
                <p>{task.day}</p>
            </div>
        );
    }
}

export default Task;
