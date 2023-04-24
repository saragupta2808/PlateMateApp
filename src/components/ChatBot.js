import React from "react";
import Modal from "react-bootstrap/Modal";

export default function ChatBot(props) {
  return (
    <>
      <Modal
        show={props.chatBot}
        onHide={props.handleCloseBot}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title
            style={{ color: "#0c7b68", fontweight: "700", fontsize: "25px" }}
          >
            Chat with us!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <iframe title="chat-bot"
            className="chatbot"
            src="https://webchat.botframework.com/embed/plate-mate-qnabot?s=4KyHKufJb_o._ec2FKy4rxUJk0ua0N0hfZ4ILXzw55D8rq0QkXjj0So"
          ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <button className="button-74" onClick={props.handleCloseBot}>
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
