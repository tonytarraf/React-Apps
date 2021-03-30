import React, { Component } from "react";

class UserForm extends Component {
	getAddUserBtnText = () => {
		return this.props.showUserFormFlag ? "Close User" : "Add User";
	};

	getAddUserBtnIcon = () => {
		return this.props.showUserFormFlag
			? "fas fa-times-circle"
			: "fas fa-plus-circle";
	};

	// User Form Validation
	validateUserForm = () => {
		if (this.props.user.fname === "") {
			this.props.showError("First Name is required.");

			return false;
		}

		if (this.props.user.lname === "") {
			this.props.showError("Last Name is required.");

			return false;
		}

		if (this.props.user.email === "") {
			this.props.showError("Email Address is required.");

			return false;
		} else {
			if (!this.validateEmailAddress(this.props.user.email)) {
				this.props.showError("Please enter a valid email address.");
				return false;
			}
		}

		if (this.props.user.country === -1) {
			this.props.showError("Country is required.");
			return false;
		}

		return true;
	};

	// Email Address Validation
	validateEmailAddress = (email) => {
		const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return pattern.test(email);
	};

	// Save User Form
	saveUserForm = (e) => {
		e.preventDefault();

		const closeUserFormFlag = false;
		this.validateUserForm() && this.props.userFormSubmit(closeUserFormFlag);
	};

	// Save And Close User Form
	saveAndCloseUserForm = (e) => {
		e.preventDefault();

		const closeUserFormFlag = true;
		this.validateUserForm() && this.props.userFormSubmit(closeUserFormFlag);
	};

	render() {
		const {
			user,
			showUserFormFlag,
			showHideUserForm,
			setUserFname,
			setUserLname,
			setUserEmail,
			setUserPhoneNumber,
			setUserCountry,
			setUserIsAdmin,
		} = this.props;

		return (
			<>
				<div className="addUserFormBtnsContainer">
					<button
						type="button"
						className="btn btm-md btnClass btnClassGrey"
						onClick={showHideUserForm}
					>
						<i className={this.getAddUserBtnIcon()}></i>
						<span>{this.getAddUserBtnText()}</span>
					</button>
				</div>

				{showUserFormFlag && (
					<form id="userForm">
						<input type="hidden" name="userId" value={user.userId} />

						<div className="row">
							<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
								<div className="form-group">
									<label htmlFor="fname">First Name *</label>
									<input
										type="text"
										name="fname"
										id="fname"
										className="form-control form-control-sm"
										value={user.fname}
										onChange={(e) => setUserFname(e.target.value)}
									/>
								</div>
							</div>

							<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
								<div className="form-group">
									<label htmlFor="lname">Last Name *</label>
									<input
										type="text"
										name="lname"
										id="lname"
										className="form-control form-control-sm"
										value={user.lname}
										onChange={(e) => setUserLname(e.target.value)}
									/>
								</div>
							</div>

							<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
								<div className="form-group">
									<label htmlFor="email">Email Address *</label>
									<input
										type="text"
										name="email"
										id="email"
										className="form-control form-control-sm"
										value={user.email}
										onChange={(e) => setUserEmail(e.target.value)}
									/>
								</div>
							</div>
						</div>

						<div className="row">
							<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
								<div className="form-group">
									<label htmlFor="phoneNumber">Phone Number</label>
									<input
										type="text"
										name="phoneNumber"
										id="phoneNumber"
										className="form-control form-control-sm"
										value={user.phoneNumber}
										onChange={(e) => setUserPhoneNumber(e.target.value)}
									/>
								</div>
							</div>

							<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12">
								<div className="form-group">
									<label htmlFor="lname">Country</label>
									<select
										id="country"
										className="form-control form-control-sm"
										value={user.country}
										onChange={(e) => setUserCountry(e.target.value)}
									>
										<option value="-1">-- Select --</option>
										<option value="Australia">Australia</option>
										<option value="Brazil">Brazil</option>
										<option value="Belgium">Belgium</option>
										<option value="Canada">Canada</option>
										<option value="China">China</option>
										<option value="France">France</option>
										<option value="Germany">Germany</option>
										<option value="Italy">Italy</option>
										<option value="Japan">Japan</option>
										<option value="Lebanon">Lebanon</option>
										<option value="Mexico">Mexico</option>
										<option value="New Zeeland">New Zeeland</option>
										<option value="United States">United States</option>
										<option value="Venezuela">Venezuela</option>
									</select>
								</div>
							</div>

							<div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 formCheckboxContainer">
								<div className="form-check">
									<input
										type="checkbox"
										name="isAdmin"
										id="isAdmin"
										className="form-check-input"
										checked={user.isAdmin}
										onChange={(e) => setUserIsAdmin(e.currentTarget.checked)}
									/>
									<label className="form-check-label" htmlFor="isAdmin">
										is Admin
									</label>
								</div>
							</div>
						</div>

						<div className="row mt-2">
							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 addUserFormBtnsContainer">
								<button
									type="button"
									className="btn btn-md btnClass btnClassGrey"
									onClick={showHideUserForm}
								>
									<i className="fas fa-times-circle"></i>
									<span>Close</span>
								</button>
								<button
									type="button"
									className="btn btn-md ml-3 mr-3 btnClass btnClassRed"
									onClick={this.saveAndCloseUserForm}
								>
									<i className="fas fa-compress-alt"></i>
									<span>Save &amp; Close</span>
								</button>
								<button
									type="button"
									className="btn btn-md btnClass btnClassBlue"
									onClick={this.saveUserForm}
								>
									<i className="fas fa-save"></i>
									<span>Save</span>
								</button>
							</div>
						</div>
					</form>
				)}
			</>
		);
	}
}

export default UserForm;
