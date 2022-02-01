import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ModalSucces = ({ showModules, handleShowModule }) => {
  const [show, setShow] = useState(false);

  function handleClose() {
    handleShowModule(false);
  }
  // const handleShow = () => setShow(true);

  useEffect(() => {
    setShow(showModules);
  }, [showModules]);

  let navigate = useNavigate();
  let formPage = "/";

  const routeChange = () => {
    navigate(formPage);
  };

  function handleModuleClose() {
    routeChange();
    handleClose();
  }

  return (
    <div>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="moduleMenu">
          <Modal.Title>
            Your application has been received successfully.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <h6>Dear Candidate</h6>
          </div>
          <div>
            Thanks for your interest in joining AAR Japan, Turkey team Our HR
            Team will review all applications, however due to quantity of
            applications only shortlisted candidates will be contacted. If not
            shortlisted or selected, your application will be saved in our
            recruitment database for any other suitable vacancies in the next 6
            months. all the best wishes AAR Japan.
          </div>
          <br></br>
          <div>Human Resources Team</div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" >
            Close
          </Button> */}
          <Button variant="primary" onClick={handleModuleClose}>
            Understood
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalSucces;
