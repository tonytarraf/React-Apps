const SearchBox = ({ value, onChange }) => {
    return (
        <input
            type="text"
            name="query"
            id="query"
            className="form-control my-3"
            placeholder="Search..."
            value={value}
            onChange={(e) => onChange(e.currentTarget.value)}
        />
    );
};

export default SearchBox;
