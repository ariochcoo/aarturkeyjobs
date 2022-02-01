import React, { useContext } from "react";
import { Table, Button, Row, Col, Form } from "react-bootstrap";
//import { Link } from "react-router-dom";
import { AppContext } from "../../Context";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const ApplyFormTable = ({
  handleSetPostFolderId,
  postFolderId,
  selectedForms,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [jobPosts, setJobPosts] = useContext(AppContext);

  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const arrayForms = [];

  selectedForms.map((formexcel) =>
    arrayForms.push({
      Position_Name: formexcel.positionName,
      Application_Code: formexcel.applicationCode,
      Name_Surname: formexcel.fullName,
      Citizenship: formexcel.citizenship,
      Address: formexcel.address,
      PhoneNumber: formexcel.phoneNumber,
      Email: formexcel.email,
      Skype_Adress: formexcel.skypeAdress,
      Education_Level: formexcel.educationLevel,
      Education_Details: formexcel.educationDetails,
      Year_Of_Related_Experience: formexcel.yearOfRelatedExperience,
      Experiences: formexcel.experiences,
      Year_Of_Experience: formexcel.yearOfExperience,
      English: formexcel.english,
      Turkish: formexcel.turkish,
      Arabic: formexcel.arabic,
      Kurdish: formexcel.kurdish,
      French: formexcel.french,
      UsingComputer: formexcel.usingComputer,
      Microsoft_Office_Package: formexcel.microsoftOfficePackage,
      Internet_Outlook: formexcel.internetOutlook,
      Salary_Expectations: formexcel.salaryExpectations,
      Specify_Salary: formexcel.specifySalary,
      Availability: formexcel.availability,
      Privacy_Notice_Accepted: formexcel.privacyNoticeAccepted,
      Cv_File_Url: formexcel.cvFileUrl,
      Cover_Letter_File_Url: formexcel.coverLetterFileUrl,
    })
  );

  function exportToCSV(csvData, fileName) {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  }

  function handleChangePostID(e) {
    handleSetPostFolderId(e.target.value);
    //console.log(e.target.value);
  }

  return (
    <div>
      <div>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
              <Form.Label>
                <h5>Please Select Job Vacancy</h5>{" "}
              </Form.Label>

              <Form.Select
                type="select"
                required
                name="educationLevel"
                value={jobPosts.id}
                onChange={(e) => {
                  handleChangePostID(e);
                }}
                aria-label="Please Select"
              >
                <option></option>
                {jobPosts.map((post, index) => (
                  <option
                    key={index}
                    value={post.id}
                  >{`${post.positionName} / ${post.referenceCode}`}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col sm={3}></Col>
          <Col sm={3}>
            <Row></Row>
            <Row>
              <Button
                varient="warning"
                onClick={(e) => exportToCSV(arrayForms, "excel Export")}
              >
                Excel Export
              </Button>
            </Row>
          </Col>
        </Row>
      </div>
      <Table className="mt-4" striped bordered hover size="sm">
        <thead align="center">
          <tr>
            <th>Name and Surname</th>
            <th>Email</th>
            <th>Skype Adress</th>
            <th>Education Level</th>
            <th>Year Of Related Experience</th>
            <th>Year Of Experience</th>
            <th> Salary Expectations</th>
            <th>CV Url</th>
            <th>Cover Letter Url</th>
          </tr>
        </thead>
        <tbody>
          {selectedForms.map((form) => (
            <tr key={form.id} align="center">
              <td>{form.fullName}</td>
              <td>{form.email}</td>
              <td>{form.skypeAdress}</td>
              <td>{form.educationLevel}</td>
              <td>{form.yearOfRelatedExperience}</td>
              <td>{form.yearOfExperience}</td>
              <td>{form.salaryExpectations}</td>
              <td>
                <a target="_blank" href={form.cvFileUrl} rel="noreferrer">
                  Go to Document
                </a>

                {/* <Link to={`${form.cvFileUrl}`}>Go to Document</Link>  */}
              </td>
              <td>
                <a
                  target="_blank"
                  href={form.coverLetterFileUrl}
                  rel="noreferrer"
                >
                  Go to Document
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ApplyFormTable;
