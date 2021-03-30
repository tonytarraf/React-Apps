import React, { Component } from "react";
import User from "./User";

class Users extends Component {
	render() {
		const { users, getUserData, setShowDeleteModal } = this.props;

		return (
			<>
				<table className="table mt-4">
					<thead>
						<tr>
							<th>Actions</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Email Address</th>
							<th>Phone Number</th>
							<th>Country</th>
							<th>User Type</th>
						</tr>
					</thead>

					<tbody>
						{users.map((user) => (
							<User
								key={user.id}
								user={user}
								getUserData={getUserData}
								setShowDeleteModal={setShowDeleteModal}
							/>
						))}
					</tbody>
				</table>
			</>
		);
	}
}

export default Users;
