const Input = ({ type, name, label, value, error, onChange }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                name={name}
                id={name}
                className="form-control"
                value={value}
                onChange={onChange}
            />
            {error && <div className="alert alert-danger">{error}</div>}
        </div>
    );
};

export default Input;
