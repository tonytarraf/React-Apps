import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import Products from "./components/products";
import Posts from "./components/posts";
import Home from "./components/home";
import Dashboard from "./components/admin/dashboard";
import ProductDetails from "./components/productDetails";
import NotFound from "./components/notFound";
import "./App.css";

// We can add the "exact" attribute to the Home route if we don't want to use the Switch Component

// If we need to pass additional props to a component, we should use the "render" attribute instead of "component":
// render={() => <Products sortBy="newest" />}

class App extends Component {
    render() {
        return (
            <div>
                <NavBar />

                <div className="content">
                    <Switch>
                        <Route
                            path="/products/:id"
                            component={ProductDetails}
                        />

                        <Route
                            path="/products"
                            render={(props) => (
                                <Products sortBy="newest" {...props} />
                            )}
                        />
                        <Route path="/posts/:year?/:month?" component={Posts} />
                        <Route path="/admin" component={Dashboard} />
                        <Redirect from="/messages" to="/posts" />
                        <Route path="/not-found" component={NotFound} />
                        <Route path="/" exact component={Home} />
                        <Redirect to="/not-found" />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;
