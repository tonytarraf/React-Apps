// Stateless Functional Component
const Navbar = ({ totalCounters }) => {
    // console.log("NavBar - Rendered");

    return (
        <nav className="navbar navbar-light bg-light">
            <div>
                Counter App
                <span className="badge badge-pill badge-secondary m-2">
                    {totalCounters}
                </span>
            </div>
        </nav>
    );
};

export default Navbar;
