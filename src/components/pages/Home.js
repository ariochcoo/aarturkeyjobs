import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  FloatingLabel,
  Form,
} from "react-bootstrap";
import { AppContext } from "../../Context";

const Home = function () {
  // eslint-disable-next-line no-unused-vars
  const [jobPosts, setJobPosts] = useContext(AppContext);
  // eslint-disable-next-line no-unused-vars
  const [currentPost, setCurrentPost] = useContext(AppContext);

  let navigate = useNavigate();
  const routeChange = (naviPageId) => {
    let path = naviPageId;
    navigate(path);
  };
  let objectPost = {};
  function selectedJobInfo(e) {
    // handleJobPageID(jobPosts);
    objectPost = jobPosts[e];
    routeChange(`jobs/${jobPosts[e].id}`);

    setCurrentPost(objectPost);
    console.log(objectPost);
  }

  return (
    <div>
      <Container>
        <Card>
          <Card.Header align="center">
            <h3>AAR Japan Vacancies </h3>
          </Card.Header>
        </Card>
        <br></br>
        <Row>
          <Col sm={3}>
            {" "}
            <Card>
              <Card.Header>
                <h4>Filter by</h4>
              </Card.Header>
              <Card.Body>
                <FloatingLabel
                  controlId="floatingSelectFields"
                  label={<h5>Field:</h5>}
                >
                  <Form.Select aria-label="Floating label select example">
                    <option></option>
                    <option value="1">Şanlıurfa</option>
                    <option value="2">Gaziantep</option>
                    <option value="3">İstanbul</option>
                  </Form.Select>
                </FloatingLabel>
                <br></br>
                <FloatingLabel
                  controlId="floatingSelectFields"
                  label={<h5>Type of contract:</h5>}
                >
                  <Form.Select aria-label="Floating label select example">
                    <option></option>
                    <option value="1">Long Term</option>
                    <option value="2">Short</option>
                    <option value="3">Limited Fixed term</option>
                  </Form.Select>
                </FloatingLabel>
                <br></br>
                <div className="d-grid gap-2">
                  <Button variant="primary" disabled size="lg">
                    Filter Vacancies
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={9}>
            <Card>
              <Card.Header>
                <h4>Vacancies List</h4>
              </Card.Header>
              <Card.Body>
                {jobPosts.length > 0
                  ? jobPosts.map((vacany, index) => (
                      <div key={index}>
                        <Card key={vacany.id}>
                          <Card.Header>{vacany.positionName}</Card.Header>
                          <Card.Body>
                            <Container>
                              <Row>
                                <Col sm={4}>
                                  <label>
                                    <h6>Position Name</h6>{" "}
                                  </label>
                                  <br />
                                  <label>{vacany.positionName}</label>
                                </Col>
                                <Col sm={4}>
                                  <label>
                                    <h6>Type Of Contract</h6>
                                  </label>
                                  <br />
                                  <label>{vacany.typeOfContract}</label>
                                </Col>
                                <Col sm={4}>
                                  <label>
                                    <h6>Location</h6>
                                  </label>
                                  <br />
                                  <label>{vacany.location}</label>
                                </Col>
                              </Row>
                              <br></br>
                              <Row>
                                <Col sm={4}>
                                  <label>
                                    <h6>Publish Date</h6>{" "}
                                  </label>
                                  <br />
                                  <label>{vacany.publishDate}</label>
                                </Col>
                                <Col sm={4}>
                                  <label>
                                    <h6>Close Date</h6>
                                  </label>
                                  <br />
                                  <label>{vacany.closeDate}</label>
                                </Col>
                                <Col sm={4}>
                                  <Button
                                    variant="primary"
                                    onClick={() => selectedJobInfo(index)}
                                  >
                                    View Vacancy
                                  </Button>
                                </Col>
                              </Row>
                            </Container>
                          </Card.Body>
                        </Card>
                        <br></br>
                      </div>
                    ))
                  : "There is no any Vacancies Now "}
              </Card.Body>
            </Card>
            <br></br>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Home;
