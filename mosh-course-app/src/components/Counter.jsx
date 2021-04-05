import React, { Component } from "react";

class Counter extends Component {
    state = {
        count: 0,
    };

    render() {
        return (
            <>
                <span className={this.getBadgeClasses()}>
                    {this.formatCount()}
                </span>
                <button
                    onClick={this.handleIncrement}
                    className="btn btn-sm btn-secondary"
                >
                    Increment
                </button>
            </>
        );
    }

    getBadgeClasses = () => {
        let classes = "badge m-2 ";
        classes += this.state.count === 0 ? "badge-warning" : "badge-primary";

        return classes;
    };

    formatCount = () => {
        const { count } = this.state;

        return count === 0 ? "Zero" : count;
    };

    handleIncrement = () => {
        this.setState({ count: this.state.count + 1 });
    };
}

export default Counter;
