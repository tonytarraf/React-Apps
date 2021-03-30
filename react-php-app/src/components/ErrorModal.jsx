import React, { Component } from "react";
import { Modal } from "react-bootstrap";

class DeleteModal extends Component {
	render() {
		const { showErrorModal, showError, message } = this.props;

		return (
			<Modal centered show={showErrorModal} onHide={() => showError("")}>
				<Modal.Header closeButton>
					<Modal.Title>
						<i className="fas fa-exclamation-triangle"></i>
						<span>Error</span>
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<span>{message}</span>
				</Modal.Body>

				<Modal.Footer>
					<button
						type="button"
						className="btn btn-md btnClass btnClassGrey"
						onClick={() => showError("")}
					>
						<i className="fas fa-times-circle"></i>
						<span>Close</span>
					</button>
				</Modal.Footer>
			</Modal>
		);
	}
}

export default DeleteModal;
