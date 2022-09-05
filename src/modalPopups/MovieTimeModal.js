import "../assets/css/modal.css";
import React from "react";
import { Modal } from "react-bootstrap";

function MovieTimeModal(props) {
    return (
        <div>
            <Modal {...props} size="md" onHide={props.onHide}>
                <Modal.Header className='modal-header' closeButton>
                    <Modal.Title>
                        Movie Time
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{textAlign:"center", fontSize:"2rem", marginLeft:'20%', marginRight:'15%', color:"dodgerblue",
                    fontWeight:"bold" }}>
                    <p>You can catch the time {props.details}</p>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default MovieTimeModal;