import React from "react";
import { Button, Modal } from "flowbite-react";

export default function CustomModel({title, children, openModal, setOpenModal, ...props}) {
  return (
    <Modal show={openModal} onClose={() => setOpenModal(false)}>
      <Modal.Header>{title}</Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={() => setOpenModal(false)}>I accept</Button>
        <Button color="gray" onClick={() => setOpenModal(false)}>
          Decline
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
}
