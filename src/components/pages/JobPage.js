import React, { useContext, useEffect } from "react";
import { AppContext } from "../../Context";
import { useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const JobPage = ({ currentJobPost, handleSetCurrentPost }) => {
  // eslint-disable-next-line no-unused-vars
  const [currentPost, setCurrentPost] = useContext(AppContext);

  useEffect(() => {
    setCurrentPost(currentJobPost);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentJobPost]);

  console.log(currentJobPost.id);

  //paragraflara bolme
  let textResponsibilities = currentJobPost.responsibilities;
  const arrayResponsibilities = textResponsibilities.split(".");
  let textEssential = currentJobPost.essential;
  const arrayEssential = textEssential.split(".");
  let textDesirable = currentJobPost.desirable;
  const arrayDesirable = textDesirable.split(".");

  //......Navigate form page ..........
  let navigate = useNavigate();
  let formPage = `applyform/${currentJobPost.id}`;

  const routeChange = () => {
    navigate(formPage);
  };
  //..........

  console.log(currentJobPost);

  return (
    <div>
      <Container>
        <Card>
          <Card.Header>
            <Row>
              <Col sm={9}>
                <h4 className=" p-1">{currentPost.positionName}</h4>
              </Col>
              <Col sm={3}>
                <div className="d-grid gap-2">
                  <Button variant="primary" onClick={routeChange}>
                    Apply Now
                  </Button>
                </div>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <div>
              <label>
                <h5>Job Details</h5>
              </label>
            </div>
            <div>
              <label>{currentPost.jobDetails}</label>
            </div>
            <br></br>
            <div>
              <label>
                <h5>Scope of Role:</h5>
                <label>
                  <h6>Reports to:</h6>
                </label>{" "}
                <label>{currentPost.reportsTo}</label>
              </label>
            </div>
            <br></br>
            <div>
              <label>
                <h5>Responsibilities</h5>
              </label>
            </div>
            <div>
              <label>
                {arrayResponsibilities.map((line, index) => (
                  <ul key={index}>
                    {index !== arrayResponsibilities.length - 1 ? (
                      <li>{line + "."}</li>
                    ) : null}
                  </ul>
                ))}
              </label>
            </div>
            <br></br>
            <div>
              <label>
                <h5>Qualification & Requirements</h5>
              </label>
            </div>
            <br></br>
            <div>
              <label>
                <h5>Essential</h5>
              </label>
            </div>
            <div>
              <label>
                {arrayEssential.map((line, index) => (
                  <ul key={index}>
                    {index !== arrayEssential.length - 1 ? (
                      <li>{line + "."}</li>
                    ) : null}
                  </ul>
                ))}
              </label>
            </div>
            <br></br>
            <div>
              <label>
                <h5>Desirable</h5>
              </label>
            </div>
            <div>
              <label>
                {" "}
                {arrayDesirable.map((line, index) => (
                  <ul key={index}>
                    {index !== arrayDesirable.length - 1 ? (
                      <li>{line + "."}</li>
                    ) : null}
                  </ul>
                ))}
              </label>
            </div>
            <br></br>
            <br></br>
            <div>
              <label>
                Due to the urgency of the position, AAR Japan reserves the right
                to recruit a candidate who matches the required profile before
                the above deadline.
              </label>
            </div>
            <br></br>
            <div>
              <label>
                Note: The application received after the closing date will not
                be given any consideration. Only short-listed candidates whose
                applications fulfill the required criteria will be contacted for
                test and interview. The submitted documents will not be
                returned.
              </label>
            </div>
            <br></br>
            <div className="d-grid gap-2">
              <Button variant="primary" onClick={routeChange}>
                Apply Now{" "}
              </Button>
            </div>
          </Card.Body>
          <br></br>
        </Card>
        <br></br>
        <br></br>
      </Container>
    </div>
  );
};
export default JobPage;
