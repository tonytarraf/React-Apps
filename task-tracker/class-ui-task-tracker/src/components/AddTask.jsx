import React, { Component } from "react";

class AddTask extends Component {
    state = {
        text: "",
        day: "",
        reminder: false,
    };

    setText = (text) => {
        this.setState({ text: text });
    };

    setDay = (day) => {
        this.setState({ day: day });
    };

    setReminder = (reminder) => {
        this.setState({ reminder: reminder });
    };

    onSubmit = (e) => {
        e.preventDefault();

        if (!this.state.text) {
            alert("Please add a task.");
            return;
        }

        this.props.onAdd({ ...this.state });

        this.setText("");
        this.setDay("");
        this.setReminder(false);
    };

    render() {
        return (
            <form className="add-form" onSubmit={this.onSubmit}>
                <div className="form-control">
                    <label htmlFor="task">Task</label>
                    <input
                        type="text"
                        name="task"
                        id="task"
                        value={this.state.text}
                        onChange={(e) => this.setText(e.target.value)}
                    />
                </div>

                <div className="form-control">
                    <label htmlFor="day">Day & Time</label>
                    <input
                        type="text"
                        name="day"
                        id="day"
                        value={this.state.day}
                        onChange={(e) => this.setDay(e.target.value)}
                    />
                </div>

                <div className="form-control form-control-check">
                    <label htmlFor="reminder">Set Reminder</label>
                    <input
                        type="checkbox"
                        name="reminder"
                        id="reminder"
                        value={this.state.reminder}
                        checked={this.state.reminder}
                        onChange={(e) =>
                            this.setReminder(e.currentTarget.checked)
                        }
                    />
                </div>

                <button type="submit" className="btn btn-block">
                    Save Task
                </button>
            </form>
        );
    }
}

export default AddTask;
