import React, { useState, useEffect } from "react";
import FirebaseFirestoreService from "../../FirebaseFirestoreService";
import { Table, Button } from "react-bootstrap";

const JobPostTable = () => {
  const [jobPosts, setJobPosts] = useState([]);

  useEffect(() => {
    fetchPosts()
      .then((fetchedPosts) => {
        setJobPosts(fetchedPosts);
      })
      .catch((error) => {
        console.error(error.message);
        throw error;
      });
  }, []);

  async function fetchPosts() {
    let fetchedPosts = [];
    try {
      const response = await FirebaseFirestoreService.readDocumentsPost({
        collection: "jobposts",
      });
      const newposts = response.docs.map((postDoc) => {
        const id = postDoc.id;
        const data = postDoc.data();
        return { ...data, id };
      });
      fetchedPosts = [...newposts];
      console.log(fetchedPosts);
    } catch (error) {
      console.error(error.message);
      throw error;
    }
    return fetchedPosts;
  }

  return (
    <div>
      <Table className="mt-4" striped bordered hover size="sm">
        <thead align="center">
          <tr>
            <th>Post ID</th>
            <th>Position Name</th>
            <th>Location</th>
            <th>Publish Date</th>
            <th>Close Date</th>
            <th>Publish Info</th>
            <th>Show Case</th>
            <th>Edit Case</th>
          </tr>
        </thead>

        <tbody>
          {jobPosts.map((jobPost) => (
            <tr key={jobPost.id} align="center">
              <td>{jobPost.id}</td>
              <td>{jobPost.positionName}</td>
              <td>{jobPost.location}</td>
              <td>{jobPost.publishDate}</td>
              <td>{jobPost.closeDate}</td>
              <td>
                {jobPost.isPublished === true ? "Published" : "Not yet Publish"}
              </td>

              <td>
                {" "}
                <Button
                  size="sm"
                  disabled
                  variant="info"
                  //onClick={() => openForm(casedata)}
                >
                  ShowPost
                </Button>{" "}
              </td>

              <td>
                {" "}
                <Button
                  size="sm"
                  disabled
                  variant="primary"
                  //onClick={() => openForm(casedata)}
                >
                  EditPost
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default JobPostTable;
