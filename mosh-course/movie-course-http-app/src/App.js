import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import http from "./services/httpService";
import config from "./config.json";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Expected errors (404: not found, 400: bad reqauest) - CLIENT ERRORS
// - Display a specific error message

// Unexpected errors (network down, server down, db down, bug)
// - Log them
// - Display a generic error message

class App extends Component {
    state = {
        posts: [],
    };

    componentDidMount() {
        this.getPosts();
    }

    getPosts = async () => {
        const response = await http.get(config.apiEndpoint);

        const posts = response.data;
        this.setState({ posts });
    };

    handleAdd = async () => {
        const obj = {
            title: "Post Title",
            body: "Post Body",
        };

        const response = await http.post(config.apiEndpoint, obj);
        const post = response.data;

        const posts = [post, ...this.state.posts];
        this.setState({ posts });
    };

    handleUpdate = async (post) => {
        post.title = "UPDATED";

        await http.put(`${config.apiEndpoint}/${post.id}`, post);

        const posts = [...this.state.posts];
        const index = posts.indexOf(post);
        posts[index] = { ...post };
        this.setState({ posts });
    };

    handleDelete = async (post) => {
        const originalPosts = this.state.posts;

        const posts = this.state.posts.filter((p) => p.id !== post.id);
        this.setState({ posts });

        try {
            await http.delete(`${config.apiEndpoint}/${post.id}`);
        } catch (e) {
            if (e.response && e.response === 404) {
                toast.error("This post has already been deleted.");
            }

            this.setState({ posts: originalPosts });
        }
    };

    render() {
        return (
            <React.Fragment>
                <ToastContainer />
                <button className="btn btn-primary mb-4" onClick={this.handleAdd}>
                    Add
                </button>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Update</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.posts.map((post) => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>
                                    <button className="btn btn-info btn-sm" onClick={() => this.handleUpdate(post)}>
                                        Update
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-danger btn-sm" onClick={() => this.handleDelete(post)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </React.Fragment>
        );
    }
}

export default App;
