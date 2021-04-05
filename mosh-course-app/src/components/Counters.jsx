import React, { Component } from "react";
import Counter from "./Counter";

class Counters extends Component {
    render() {
        const { counters, onReset, onIncrement, onDelete } = this.props;
        return (
            <>
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
                    />
                ))}
            </>
        );
    }
}

export default Counters;
