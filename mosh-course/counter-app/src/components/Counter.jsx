// imrc: Import React / Component
// cc: Class Component

import React, { Component } from "react";

class Counter extends Component {
    formatCount = () => {
        return this.props.counter.value === 0
            ? "Zero"
            : this.props.counter.value;
    };

    getBadgesClass = () => {
        let classes = "badge m-2 badge-";
        classes += this.props.counter.value === 0 ? "warning" : "primary";
        return classes;
    };

    // componentDidUpdate(prevProps, prevState) {
    //     console.log("prevProps", prevProps);
    //     console.log("prevState", prevState);

    //     if (prevProps.counter.value !== this.props.counter.value) {
    //         // Ajax call ...
    //     }
    // }

    // componentWillUnmount() {
    //     console.log("Counter - Unmount");
    // }

    render() {
        // console.log("Counter - Rendered");

        return (
            <div>
                <span className={this.getBadgesClass()}>
                    {this.formatCount()}
                </span>
                <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => this.props.onIncrement(this.props.counter)}
                >
                    Increment
                </button>

                <button
                    className="btn btn-secondary btn-sm ml-2"
                    onClick={() => this.props.onDecrement(this.props.counter)}
                >
                    Decrement
                </button>

                <button
                    className="btn btn-danger btn-sm m-2"
                    onClick={() => this.props.onDelete(this.props.counter.id)}
                >
                    Delete
                </button>
            </div>
        );
    }
}

export default Counter;
