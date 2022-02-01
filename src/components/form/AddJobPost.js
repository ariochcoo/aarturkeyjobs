import React, { useState } from "react";
import { Form, Container, Button, Row, Col, Card } from "react-bootstrap";
//import { AppContext } from "../../Context";
const AddjobPost = ({ handleAddJobPost }) => {
  const [newPost, setNewPost] = useState({
    positionName: "",
    referenceCode: "",
    location: "",
    publishDate: "",
    closeDate: "",
    typeOfContract: "",
    jobDetails: "",
    reportsTo: "",
    responsibilities: "",
    essential: "",
    desirable: "",

    isPublished: false,
  });

  const onChange = (e) =>
    setNewPost({ ...newPost, [e.target.name]: e.target.value });

  function handlePostFormSubmit(e) {
    e.preventDefault();

    handleAddJobPost(newPost);
  }

  return (
    <Container>
      <div>
        <Card>
          <Card.Header>
            <h4>Add New Post</h4>
          </Card.Header>
          <Card.Body>
            <Form onSubmit={handlePostFormSubmit}>
              <Row className="mb-3">
                <Col>
                  <Form.Group
                    className="mb-2"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Position Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="positionName"
                      value={newPost.positionName}
                      onChange={onChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-2"
                    controlId="exampleForm.ControlInput1"
                  >
                    <Form.Label>Reference Code</Form.Label>
                    <Form.Control
                      type="text"
                      name="referenceCode"
                      value={newPost.referenceCode}
                      onChange={onChange}
                    />
                  </Form.Group>
                </Col>

                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput2"
                  >
                    <Form.Label>Location</Form.Label>
                    <Form.Control
                      type="text"
                      name="location"
                      value={newPost.location}
                      onChange={onChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput12"
                  >
                    <Form.Label>Type Of Contract</Form.Label>
                    <Form.Control
                      type="text"
                      name="typeOfContract"
                      value={newPost.typeOfContract}
                      onChange={onChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput12"
                  >
                    <Form.Label>Reports To</Form.Label>
                    <Form.Control
                      type="text"
                      name="reportsTo"
                      value={newPost.reportsTo}
                      onChange={onChange}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput3"
                  >
                    <Form.Label>Publish Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="publishDate"
                      value={newPost.publishDate}
                      onChange={onChange}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput4"
                  >
                    <Form.Label>Close Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="closeDate"
                      value={newPost.closeDate}
                      onChange={onChange}
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea5"
              >
                <Form.Label>Job Details</Form.Label>
                <Form.Control
                  as="textarea"
                  name="jobDetails"
                  rows={3}
                  value={newPost.jobDetails}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea6"
              >
                <Form.Label>Responsibilities</Form.Label>
                <Form.Control
                  as="textarea"
                  name="responsibilities"
                  rows={3}
                  value={newPost.responsibilities}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea7"
              >
                <Form.Label>Essential</Form.Label>
                <Form.Control
                  as="textarea"
                  name="essential"
                  rows={3}
                  value={newPost.essential}
                  onChange={onChange}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea8"
              >
                <Form.Label>Desirable</Form.Label>
                <Form.Control
                  as="textarea"
                  name="desirable"
                  rows={3}
                  value={newPost.desirable}
                  onChange={onChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </Container>
  );
};

export default AddjobPost;
