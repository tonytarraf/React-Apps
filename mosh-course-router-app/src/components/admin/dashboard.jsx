import React from "react";
// import { Route, Switch, Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import Users from "./users";
import Posts from "./posts";
import Sidebar from "./sidebar";
import NotFound from "../notFound";

const Dashboard = ({ match }) => {
    return (
        <div>
            <h1>Admin Dashboard</h1>
            <Sidebar />
            {/* <Switch> */}
            <Route path="/admin/users" component={Users} />
            <Route path="/admin/posts" component={Posts} />
            {/* <Route path="/not-found" component={NotFound} />
                <Redirect to="/not-found" /> */}
            {/* </Switch> */}
        </div>
    );
};

export default Dashboard;
