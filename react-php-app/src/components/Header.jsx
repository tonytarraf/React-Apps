import React, { Component } from "react";
import { Link } from "react-router-dom";

class Header extends Component {
	render() {
		return (
			<>
				<header className="navbar navbar-expand-lg navbar-dark bg-dark">
					<Link to={"/"} className="navbar-brand">
						React CRUD App
					</Link>

					<div className="collapse navbar-collapse" id="navbarNav">
						<ul className="navbar-nav">
							<li className="nav-item">
								<Link to={"/"} className="nav-link">
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link to={"/about"} className="nav-link">
									About
								</Link>
							</li>
						</ul>
					</div>
				</header>
			</>
		);
	}
}

export default Header;
