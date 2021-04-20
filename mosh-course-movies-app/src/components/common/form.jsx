import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
    state = {
        data: {},
        errors: {},
    };

    validate = () => {
        const options = { abortEarly: false };
        const result = Joi.validate(this.state.data, this.schema, options);

        if (!result.error) return null;

        const errors = {};
        for (let item of result.error.details) {
            errors[item.path[0]] = item.message;
        }

        return errors;

        // Basic Form Validation without Using Joi //
        // const errors = {};

        // const { data } = this.state;
        // if (data.username.trim() === "")
        //     errors.username = "Username is required.";
        // if (data.password.trim() === "")
        //     errors.password = "Password is required.";

        // return Object.keys(errors).length === 0 ? null : errors;
    };

    validateProperty = (input) => {
        const obj = { [input.name]: input.value };
        const schema = { [input.name]: this.schema[input.name] };
        const result = Joi.validate(obj, schema);

        return result.error ? result.error.details[0].message : null;

        // Basic Input Validation without Using Joi //
        // if (input.name === "username") {
        //     if (input.value.trim() === "") {
        //         return "Username is required.";
        //     }
        // }
        // if (input.name === "password") {
        //     if (input.value.trim() === "") {
        //         return "Password is required.";
        //     }
        // }
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const errors = this.validate();
        this.setState({ errors: errors || {} });
        if (errors) return;

        this.doSubmit();
    };

    handleChange = ({ currentTarget: input }) => {
        const errors = { ...this.state.errors };
        const errorMessage = this.validateProperty(input);

        if (errorMessage) {
            errors[input.name] = errorMessage;
        } else {
            delete errors[input.name];
        }

        const data = { ...this.state.data };
        data[input.name] = input.value;

        this.setState({ data, errors });
    };

    renderButton = (label) => {
        return (
            <button className="btn btn-primary" disabled={this.validate()}>
                {label}
            </button>
        );
    };

    renderInput = (name, label, type = "text") => {
        const { data, errors } = this.state;

        return (
            <Input
                type={type}
                name={name}
                label={label}
                value={data[name]}
                error={errors[name]}
                onChange={this.handleChange}
            />
        );
    };

    renderSelect = (name, label, options) => {
        const { data, errors } = this.state;

        return (
            <Select
                name={name}
                value={data[name]}
                label={label}
                options={options}
                error={errors[name]}
                onChange={this.handleChange}
            />
        );
    };
}

export default Form;
