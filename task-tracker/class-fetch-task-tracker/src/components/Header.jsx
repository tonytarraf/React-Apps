import React, { Component } from "react";
import Button from "./Button";

class Header extends Component {
    render() {
        const { title, showAdd, onAdd } = this.props;

        return (
            <header className="header">
                <h1>{title}</h1>

                <Button
                    color={showAdd ? "red" : "green"}
                    text={showAdd ? "Close" : "Add"}
                    onClick={onAdd}
                />
            </header>
        );
    }
}

export default Header;
