import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class DeleteModal extends Component {
	render() {
		const {
			setShowDeleteModal,
			showDeleteModal,
			deleteUser,
			userId,
		} = this.props;

		return (
			<Modal centered show={showDeleteModal} onHide={setShowDeleteModal}>
				<Modal.Header closeButton>
					<Modal.Title>Delete User</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<span>Are you sure you want to delete this user ?</span>
				</Modal.Body>

				<Modal.Footer>
					<button
						type="button"
						className="btn btn-md btnClass btnClassGrey"
						onClick={setShowDeleteModal}
					>
						<i className="fas fa-thumbs-down"></i>
						<span>No</span>
					</button>

					<button
						type="button"
						className="btn btn-md btnClass btnClassRed"
						onClick={() => deleteUser(userId)}
					>
						<i className="fas fa-thumbs-up"></i>
						<span>Yes</span>
					</button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default DeleteModal;
