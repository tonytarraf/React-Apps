import React, { Component } from "react";
import axios from "axios";
import UserForm from "./UserForm";
import Users from "./Users";
import ErrorModal from "./ErrorModal";
import DeleteModal from "./DeleteModal";

class Home extends Component {
	state = {
		showAddUserFormFlag: false,
		showDeleteModal: false,
		showErrorModal: false,
		errorMessage: "",
		userId: -1,
		users: [],
		user: {
			userId: -1,
			fname: "",
			lname: "",
			email: "",
			phoneNumber: "",
			country: -1,
			isAdmin: false,
		},
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

			this.showError(msg);
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

			this.showError(msg);
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

			this.showError(msg);
		} else {
			const userData = data[1];

			const fname = userData.fname;
			const lname = userData.lname;
			const email = userData.email;
			const phoneNumber = userData.phone_number;
			const country = userData.country;
			const isAdminVal = userData.is_admin;

			const isAdmin = isAdminVal === "1" ? true : false;

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
			this.setState({ showAddUserFormFlag: true });
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

			this.showError(msg);
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

	// Set Show Error Modal
	showError = (errorMessage) => {
		this.setState({ errorMessage });
		this.setState({ showErrorModal: !this.state.showErrorModal });
	};

	render() {
		return (
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
					showError={this.showError}
				/>

				<Users
					users={this.state.users}
					getUserData={this.getUserData}
					setShowDeleteModal={this.setShowDeleteModal}
				/>

				<DeleteModal
					userId={this.state.userId}
					deleteUser={this.deleteUser}
					showDeleteModal={this.state.showDeleteModal}
					setShowDeleteModal={this.setShowDeleteModal}
				/>

				<ErrorModal
					showErrorModal={this.state.showErrorModal}
					showError={this.showError}
					message={this.state.errorMessage}
				/>
			</>
		);
	}

	componentDidMount() {
		this.loadUsersTable();
	}
}

export default Home;
