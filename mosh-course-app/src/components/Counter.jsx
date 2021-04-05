import React, { Component } from "react";

class Counter extends Component {
    render() {
        return (
            <div>
                <span className={this.getBadgeClasses()}>
                    {this.formatCount()}
                </span>
                <button
                    onClick={() => this.props.onIncrement(this.props.counter)}
                    className="btn btn-sm btn-secondary"
                >
                    Increment
                </button>
                <button
                    onClick={() => this.props.onDelete(this.props.counter.id)}
                    className="btn btn-sm btn-danger m-2"
                >
                    Delete
                </button>
            </div>
        );
    }

    getBadgeClasses = () => {
        let classes = "badge m-2 ";
        classes +=
            this.props.counter.value === 0 ? "badge-warning" : "badge-primary";

        return classes;
    };

    formatCount = () => {
        const { value } = this.props.counter;

        return value === 0 ? "Zero" : value;
    };
}

export default Counter;
