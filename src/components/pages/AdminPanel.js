import React, { useState, useEffect } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import AddjobPost from "../form/AddJobPost";
import JobPostTable from "../tables/JobPostTable";
import FirebaseFirestoreService from "../../FirebaseFirestoreService";

import ApplyFormTable from "../tables/ApplyFormTable";

const AdminPanel = function () {
  //const [jobPosts, setJobPosts] = useState([]);
  const [forms, setForms] = useState([]);
  const [postFolderId, setPostFolderId] = useState("");

  useEffect(() => {
    if (postFolderId)
      fetchForms()
        .then((fetchedForms) => {
          setForms(fetchedForms);
        })
        .catch((error) => {
          console.error(error.message);
          throw error;
        });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postFolderId]);

  async function handleAddJobPost(newPost) {
    try {
      const response = await FirebaseFirestoreService.createDocumentPost(
        "jobposts",
        newPost
      );
      //setJobPosts((jobPosts) => [...jobPosts, newPost]);

      alert(`succesfully created ${response.id}`);
    } catch (error) {
      alert(error.message);
      throw error;
    }
  }

  async function fetchForms() {
    let fetchedForms = [];
    try {
      const responsea = await FirebaseFirestoreService.readDocumentsForms({
        collection: "jobposts",
        folderId: postFolderId,
      });
      const newForms = responsea.docs.map((formDoc) => {
        const id = formDoc.id;
        const data = formDoc.data();

        return { ...data, id };
      });

      fetchedForms = [...newForms];
    } catch (error) {
      console.error(error.message);
      throw error;
    }
    return fetchedForms;
  }

  console.log(postFolderId);
  return (
    <Container>
      <div align="center">
        <label>
          {" "}
          <h3>Admin Panel</h3>
        </label>
      </div>

      <Tab.Container id="left-tabs-example" defaultActiveKey="tableForm">
        <Row>
          <Col sm={2}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="form">Add New Post</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="table">Post List</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tableForm">Application List</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>

          <Col sm={10}>
            <Tab.Content>
              <Tab.Pane eventKey="form">
                <AddjobPost handleAddJobPost={handleAddJobPost} />
              </Tab.Pane>
              <Tab.Pane eventKey="table">
                <JobPostTable />
              </Tab.Pane>
              <Tab.Pane eventKey="tableForm">
                <ApplyFormTable
                  postFolderId={postFolderId}
                  selectedForms={forms}
                  handleSetPostFolderId={(postid) => {
                    setPostFolderId(postid);
                  }}
                />
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default AdminPanel;
