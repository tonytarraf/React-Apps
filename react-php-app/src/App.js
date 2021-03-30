import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Footer from "./components/Footer";
import About from "./components/About";
import UserForm from "./components/UserForm";
import Users from "./components/Users";
import DeleteModal from "./components/DeleteModal";

class App extends Component {
	state = {
		showAddUserFormFlag: false,

		showDeleteModal: false,

		user: {
			userId: -1,
			fname: "",
			lname: "",
			email: "",
			phoneNumber: "",
			country: -1,
			isAdmin: false,
		},

		userId: -1,

		users: [],
	};

	// Show/Hide User Form
	showHideUserForm = () => {
		this.setState({ showAddUserFormFlag: !this.state.showAddUserFormFlag });
		this.resetUserForm();
	};

	// Set fname State
	setUserFname = (fname) => {
		let user = { ...this.state.user };
		user.fname = fname;

		this.setState({ user });
	};

	// Set lname State
	setUserLname = (lname) => {
		let user = { ...this.state.user };
		user.lname = lname;

		this.setState({ user });
	};

	// Set email State
	setUserEmail = (email) => {
		let user = { ...this.state.user };
		user.email = email;

		this.setState({ user });
	};

	// Set phoneNumber State
	setUserPhoneNumber = (phoneNumber) => {
		let user = { ...this.state.user };
		user.phoneNumber = phoneNumber;

		this.setState({ user });
	};

	// Set country State
	setUserCountry = (country) => {
		let user = { ...this.state.user };
		user.country = country;

		this.setState({ user });
	};

	// Set isAdmin State
	setUserIsAdmin = (isAdmin) => {
		let user = { ...this.state.user };
		user.isAdmin = isAdmin;

		this.setState({ user });
	};

	// Reset User Form
	resetUserForm = () => {
		const user = {
			userId: -1,
			fname: "",
			lname: "",
			email: "",
			phoneNumber: "",
			country: -1,
			isAdmin: false,
		};

		this.setState({ user });
	};

	// Submit User Form
	userFormSubmit = async (closeUserFormFlag) => {
		let formData = new FormData();

		formData.append("userId", this.state.user.userId);
		formData.append("fname", this.state.user.fname);
		formData.append("lname", this.state.user.lname);
		formData.append("email", this.state.user.email);
		formData.append("phoneNumber", this.state.user.phoneNumber);
		formData.append("country", this.state.user.country);
		this.state.user.isAdmin
			? formData.append("isAdmin", 1)
			: formData.append("isAdmin", 0);

		let res = await axios({
			method: "POST",
			url: "http://localhost/react-php-app/Home/userFormSubmit",
			data: formData,
		});

		const data = res.data;
		const flag = data[0];

		if (flag === -1) {
			const msg = data[1];
			alert(msg);
		} else {
			this.state.user.userId === -1 && this.resetUserForm();
			this.loadUsersTable();

			if (closeUserFormFlag) {
				this.setState({ showAddUserFormFlag: !this.state.showAddUserFormFlag });
			}
		}
	};

	// Load Users Table
	loadUsersTable = async () => {
		let res = await axios({
			method: "GET",
			url: "http://localhost/react-php-app/Home/getUsers",
		});

		const data = res.data;
		const flag = data[0];

		if (flag === -1) {
			const msg = data[1];
			alert(msg);
		} else {
			const usersArr = data[1];
			this.setState({ users: usersArr });
		}
	};

	// Load User Data
	getUserData = async (userId) => {
		let formData = new FormData();
		formData.append("userId", userId);

		let res = await axios({
			method: "POST",
			url: "http://localhost/react-php-app/Home/getUserData",
			data: formData,
		});

		const data = res.data;
		const flag = data[0];

		if (flag === -1) {
			const msg = data[1];
			alert(msg);
		} else {
			const userData = data[1];

			const fname = userData.fname;
			const lname = userData.lname;
			const email = userData.email;
			const phoneNumber = userData.phone_number;
			const country = userData.country;
			const isAdmin = userData.is_admin;

			const user = {
				userId: userId,
				fname: fname,
				lname: lname,
				email: email,
				phoneNumber: phoneNumber,
				country: country,
				isAdmin: isAdmin,
			};

			this.setState({ user });
			this.setState({ showAddUserFormFlag: !this.state.showAddUserFormFlag });
		}
	};

	// Delete User
	deleteUser = async (userId) => {
		let formData = new FormData();
		formData.append("userId", userId);

		let res = await axios({
			method: "POST",
			url: "http://localhost/react-php-app/Home/deleteUser",
			data: formData,
		});

		const data = res.data;
		const flag = data[0];

		if (flag === -1) {
			const msg = data[1];
			alert(msg);
		} else {
			this.setShowDeleteModal(-1);
			this.loadUsersTable();
		}
	};

	// Set Show Delete Modal
	setShowDeleteModal = (userId) => {
		this.setState({ userId });
		this.setState({ showDeleteModal: !this.state.showDeleteModal });
	};

	render() {
		return (
			<Router>
				<Header />

				<div className="container mt-4">
					<>
						<UserForm
							user={this.state.user}
							showUserFormFlag={this.state.showAddUserFormFlag}
							showHideUserForm={this.showHideUserForm}
							userFormSubmit={this.userFormSubmit}
							setUserFname={this.setUserFname}
							setUserLname={this.setUserLname}
							setUserEmail={this.setUserEmail}
							setUserPhoneNumber={this.setUserPhoneNumber}
							setUserCountry={this.setUserCountry}
							setUserIsAdmin={this.setUserIsAdmin}
						/>

						<Users
							users={this.state.users}
							getUserData={this.getUserData}
							setShowDeleteModal={this.setShowDeleteModal}
						/>
					</>

					<DeleteModal
						userId={this.state.userId}
						deleteUser={this.deleteUser}
						showDeleteModal={this.state.showDeleteModal}
						setShowDeleteModal={this.setShowDeleteModal}
					/>

					<Switch>
						<Route exact path="/about" component={About} />
					</Switch>
				</div>

				<Footer />
			</Router>
		);
	}

	componentDidMount() {
		this.loadUsersTable();
	}
}

export default App;
