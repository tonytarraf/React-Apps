import React, { Component } from "react";

class Button extends Component {
    render() {
        const { color, text, onClick } = this.props;

        return (
            <button
                className="btn btn-md"
                style={{ backgroundColor: color }}
                onClick={onClick}
            >
                {text}
            </button>
        );
    }
}

export default Button;
