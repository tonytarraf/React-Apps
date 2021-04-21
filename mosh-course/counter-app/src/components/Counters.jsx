import React, { Component } from "react";
import Counter from "./Counter";

class Counters extends Component {
    render() {
        // console.log("Counters - Rendered");

        const {
            onReset,
            counters,
            onDelete,
            onIncrement,
            onDecrement,
        } = this.props;

        return (
            <div>
                <button
                    className="btn btn-primary btn-sm m-2"
                    onClick={onReset}
                >
                    Reset
                </button>

                {counters.map((counter) => (
                    <Counter
                        key={counter.id}
                        counter={counter}
                        onDelete={onDelete}
                        onIncrement={onIncrement}
                        onDecrement={onDecrement}
                    />
                ))}
            </div>
        );
    }
}

export default Counters;
