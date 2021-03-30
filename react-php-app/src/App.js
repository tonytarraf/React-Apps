import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";

class App extends Component {
	render() {
		return (
			<Router>
				<Header />

				<div className="container mt-4">
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/about" component={About} />
					</Switch>
				</div>

				<Footer />
			</Router>
		);
	}
}

export default App;
