import React, { Component } from "react";

class User extends Component {
	render() {
		const { user, getUserData, setShowDeleteModal } = this.props;

		return (
			<tr>
				<td>
					<button
						type="button"
						className="tableBtn editUserBtn"
						title="Edit"
						onClick={() => getUserData(user.id)}
					>
						<i className="fas fa-edit"></i>
					</button>
					<button
						type="button"
						className="tableBtn deleteUserBtn"
						title="Delete"
						onClick={() => setShowDeleteModal(user.id)}
					>
						<i className="fas fa-trash"></i>
					</button>
				</td>
				<td>{user.fname}</td>
				<td>{user.lname}</td>
				<td>{user.email}</td>
				<td>{user.phone_number}</td>
				<td>{user.country}</td>
				<td>{user.is_admin === "1" ? "Admin" : "User"}</td>
			</tr>
		);
	}
}

export default User;
