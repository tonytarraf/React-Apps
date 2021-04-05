import React, { Component } from "react";

class Counter extends Component {
    render() {
        const { counter, onIncrement, onDecrement, onDelete } = this.props;
        return (
            <div className="row">
                <div className="col-2">
                    <span className={this.getBadgeClasses()}>
                        {this.formatCount()}
                    </span>
                </div>
                <div className="col">
                    <button
                        onClick={() => onIncrement(counter)}
                        className="btn btn-secondary btn-sm"
                    >
                        +
                    </button>
                    <button
                        onClick={() => onDecrement(counter)}
                        className="btn btn-secondary btn-sm m-2"
                        disabled={counter.value === 0 ? "disabled" : ""}
                    >
                        -
                    </button>
                    <button
                        onClick={() => onDelete(counter.id)}
                        className="btn btn-danger btn-sm"
                    >
                        x
                    </button>
                </div>
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
