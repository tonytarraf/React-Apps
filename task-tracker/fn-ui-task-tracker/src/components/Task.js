// npm i react-icons

import { FaTimes } from "react-icons/fa";

const Task = (props) => {
    const { task, onDelete, onToggle } = props;

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
};

export default Task;
