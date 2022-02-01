import React, { useState, useContext, useEffect } from "react";
import { AppContext } from "../../Context";
import FirebaseFirestoreService from "../../FirebaseFirestoreService";
import { Card, Container, Row, Col, Button, Form } from "react-bootstrap";
import AddFileForm from "./AddFileForm";
import ModalSucces from "../utils/ModalSucces";

const AddApplyForm = ({ currentJobPost }) => {
  // eslint-disable-next-line no-unused-vars
  const [currentPost, setCurrentPost] = useContext(AppContext);

  const [agreeToAllTerms, setAgreeToAllTerms] = useState(false);
  const [showModules, setShowModules] = useState(false);
  const [fileUrl, setFileUrl] = useState("");
  const [clfileUrl, setClFileUrl] = useState("");
  // const [folderPath, setFolderPath] = useState("");
  const [applyForm, setApplyForm] = useState({
    postId: currentJobPost.id,
    positionName: currentJobPost.positionName,
    applicationCode: "",
    fullName: "",
    citizenship: "",
    address: "",
    phoneNumber: "",
    email: "",
    skypeAdress: "",
    educationLevel: "", //selection
    educationDetails: "",
    yearOfRelatedExperience: "",
    experiences: "",
    yearOfExperience: "",
    english: "", //selection
    turkish: "", //selection
    arabic: "", //selection
    kurdish: "", //selection
    french: "", //selection
    usingComputer: "", //selection
    microsoftOfficePackage: "", //selection
    internetOutlook: "", //selection
    salaryExpectations: "", //selection
    specifySalary: "",
    availability: "", //date
    privacyNoticeAccepted: "",
    cvFileUrl: "",
    coverLetterFileUrl: "",
  });

  useEffect(() => {
    if (fileUrl !== "") {
      setApplyForm({
        ...applyForm,
        cvFileUrl: fileUrl,
      });
    }
    if (clfileUrl !== "") {
      setApplyForm({
        ...applyForm,
        coverLetterFileUrl: clfileUrl,
      });
      console.log(clfileUrl);
    }
    // let folderIDpath = `jobposts/${currentPost.id}/applyforms/${currentPost.id}/${applyForm.fullName}`;
    // setFolderPath(folderIDpath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileUrl, clfileUrl]);

  const onChange = (e) =>
    setApplyForm({
      ...applyForm,
      [e.target.name]: e.target.value,
    });

  async function handleAddApplyForm(newForm) {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await FirebaseFirestoreService.createDocumentForm({
        collection: "jobposts",
        folderId: currentJobPost.id,
        document: newForm,
      });
      setShowModules(true);
    } catch (error) {
      alert(error.message);
      throw error;
    }
  }

  function handleApplyFormSubmit(e) {
    e.preventDefault();

    handleAddApplyForm(applyForm);
  }

  const handleChangeChk = (chkValue) => {
    setAgreeToAllTerms(chkValue.target.checked);
    console.log(agreeToAllTerms);
  };

  return (
    <div>
      <Container>
        <ModalSucces
          showModules={showModules}
          handleShowModule={(module) => {
            setShowModules(module);
          }}
        ></ModalSucces>
        <Card>
          <Card.Header className="cardMenu">
            <h4>Apply Form</h4>
            <label>{`Position Name: ${currentJobPost.positionName}`}</label>{" "}
            <label>{`/   Referance Code:${currentJobPost.referanceCode}`}</label>
          </Card.Header>

          <Card.Body>
            <Form onSubmit={handleApplyFormSubmit}>
              <Card>
                <Card.Header>
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput184"
                  >
                    <Form.Label>General Info / Genel Bilgi</Form.Label>
                  </Form.Group>
                </Card.Header>

                <Card.Body>
                  <Row className="mb-3">
                    <Col>
                      <Form.Group
                        className="mb-2"
                        controlId="exampleForm.ControlInput1"
                      >
                        <Form.Label>Name, Surname / İsim ve Soyisim</Form.Label>
                        <Form.Control
                          required
                          type="text"
                          name="fullName"
                          value={applyForm.fullName}
                          onChange={onChange}
                        />
                      </Form.Group>
                    </Col>

                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput2"
                      >
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                          required
                          type="email"
                          name="email"
                          value={applyForm.email}
                          onChange={onChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput3"
                      >
                        <Form.Label>
                          Phone Number / Telefon numarası{" "}
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="phoneNumber"
                          value={applyForm.phoneNumber}
                          onChange={onChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput4"
                      >
                        <Form.Label>
                          Do you have Turkish citizenship? / Türkiye Cumhuriyeti
                          Vatandaşlığınız var mı ?
                        </Form.Label>

                        <Form.Select
                          type="select"
                          required
                          name="citizenship"
                          value={applyForm.citizenship}
                          onChange={onChange}
                          aria-label="Please Select"
                        >
                          <option></option>
                          <option value="Yes">Yes/Evet</option>
                          <option value="No">No/Hayır</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row className="mb-3">
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput6"
                      >
                        <Form.Label>Address / Adres</Form.Label>
                        <Form.Control
                          as="textarea"
                          name="address"
                          rows={2}
                          value={applyForm.address}
                          onChange={onChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput7"
                      >
                        <Form.Label>Skype Adress</Form.Label>
                        <Form.Control
                          type="text"
                          name="skypeAdress"
                          value={applyForm.skypeAdress}
                          onChange={onChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <br></br>

              <Card>
                <Card.Header>
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput164"
                  >
                    <Form.Label>
                      Education & Experiences / Eğitim ve İş Deneyimi
                    </Form.Label>
                  </Form.Group>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput4"
                      >
                        <Form.Label>
                          Education Level / Eğitim seviyesi
                        </Form.Label>

                        <Form.Select
                          type="select"
                          required
                          name="educationLevel"
                          value={applyForm.educationLevel}
                          onChange={onChange}
                          aria-label="Please Select"
                        >
                          <option></option>
                          <option value="Elementary School / İlkokul">
                            Elementary School / İlkokul
                          </option>
                          <option value="Secondary School / Ortaokul">
                            Secondary School / Ortaokul
                          </option>
                          <option value="High school / Lise">
                            High school / Lise
                          </option>
                          <option value="Certificate / Önlisans">
                            Certificate / Önlisans
                          </option>
                          <option value="Bachelor / Lisans">
                            Bachelor / Lisans
                          </option>
                          <option value="Master / Yüksek lisans">
                            Master / Yüksek lisans
                          </option>
                          <option value="PHD / Doktora">PHD / Doktora</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput6"
                      >
                        <Form.Label>
                          Education Details: Please mention last 2 education
                          certificates with school name and graduation year / En
                          son eğitim aldığınız iki okulun isim ve mezuniyet
                          tarihi :
                        </Form.Label>
                        <Form.Control
                          required
                          as="textarea"
                          name="educationDetails"
                          rows={2}
                          value={applyForm.educationDetails}
                          onChange={onChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput4"
                      >
                        <Form.Label>
                          Years Of related experience /Başvurduğunuz alanla
                          ilgili tecrübe
                        </Form.Label>

                        <Form.Select
                          type="select"
                          required
                          name="yearOfRelatedExperience"
                          value={applyForm.yearOfRelatedExperience}
                          onChange={onChange}
                          aria-label="Please Select"
                        >
                          <option></option>
                          <option value="Less than one year / 1 Yıldan az">
                            Less than one year / 1 Yıldan az
                          </option>
                          <option value=" One to Three years / 1 - 3 Yıl arası">
                            One to Three years / 1 - 3 Yıl arası
                          </option>
                          <option value="Three to Five Years / 3-5 Yıl arası">
                            Three to Five Years / 3-5 Yıl arası
                          </option>
                          <option value="More than Five years - 5 Yıldan fazla">
                            More than Five years - 5 Yıldan fazla
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput6"
                      >
                        <Form.Label>
                          Experiences: please mention your last 2 work
                          experiences, with Employer information and years of
                          relation / Lütfen en son iki iş tecrübenizi işveren
                          bilgileri, işe başlangıç ve ayrılış tarihleri ile
                          birlikte yazar mısınız :
                        </Form.Label>
                        <Form.Control
                          required
                          as="textarea"
                          name="experiences"
                          rows={2}
                          value={applyForm.experiences}
                          onChange={onChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput4"
                      >
                        <Form.Label>
                          Year of Experience / İş tecrübesi
                        </Form.Label>

                        <Form.Select
                          required
                          type="select"
                          name="yearOfExperience"
                          value={applyForm.yearOfExperience}
                          onChange={onChange}
                          aria-label="Please Select"
                        >
                          <option></option>
                          <option value="Less than one year / 1 Yıldan az">
                            Less than one year / 1 Yıldan az
                          </option>
                          <option value="One to Three years / 1 - 3 Yıl arası">
                            One to Three years / 1 - 3 Yıl arası
                          </option>
                          <option value="Three to Five Years / 3-5 Yıl arası">
                            Three to Five Years / 3-5 Yıl arası
                          </option>
                          <option value=" More than Five years - 5 Yıldan fazla">
                            More than Five years - 5 Yıldan fazla
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col></Col>
                  </Row>
                </Card.Body>
              </Card>
              <br></br>
              <Card>
                <Card.Header>
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput94"
                  >
                    <Form.Label>Languages / Yabancı dil bilgisi</Form.Label>
                  </Form.Group>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput4"
                      >
                        <Form.Label>English / İngilizce</Form.Label>

                        <Form.Select
                          required
                          type="select"
                          name="english"
                          value={applyForm.english}
                          onChange={onChange}
                          aria-label="Please Select"
                        >
                          <option></option>
                          <option value="None / Hiç ">None / Hiç </option>
                          <option value="Basics / Temel">Basics / Temel</option>
                          <option value="Good / İyi">Good / İyi</option>
                          <option value="Advanced / Gelişmiş">
                            Advanced / Gelişmiş
                          </option>
                          <option value="Fluent / Akıcı , Kusursuz">
                            Fluent / Akıcı , Kusursuz
                          </option>
                          <option value="Native / Ana dili">
                            Native / Ana dili
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput4"
                      >
                        <Form.Label>Turkish / Türkçe</Form.Label>

                        <Form.Select
                          type="select"
                          name="turkish"
                          value={applyForm.turkish}
                          onChange={onChange}
                          aria-label="Please Select"
                        >
                          <option></option>
                          <option value="None / Hiç ">None / Hiç </option>
                          <option value="Basics / Temel">Basics / Temel</option>
                          <option value="Good / İyi">Good / İyi</option>
                          <option value="Advanced / Gelişmiş">
                            Advanced / Gelişmiş
                          </option>
                          <option value="Fluent / Akıcı , Kusursuz">
                            Fluent / Akıcı , Kusursuz
                          </option>
                          <option value="Native / Ana dili">
                            Native / Ana dili
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput4"
                      >
                        <Form.Label>Arabic /Arapça</Form.Label>

                        <Form.Select
                          type="select"
                          name="arabic"
                          value={applyForm.arabic}
                          onChange={onChange}
                          aria-label="Please Select"
                        >
                          <option></option>
                          <option value="None / Hiç ">None / Hiç </option>
                          <option value="Basics / Temel">Basics / Temel</option>
                          <option value="Good / İyi">Good / İyi</option>
                          <option value="Advanced / Gelişmiş">
                            Advanced / Gelişmiş
                          </option>
                          <option value="Fluent / Akıcı , Kusursuz">
                            Fluent / Akıcı , Kusursuz
                          </option>
                          <option value="Native / Ana dili">
                            Native / Ana dili
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput4"
                      >
                        <Form.Label>Kurdish / Kürtçe</Form.Label>

                        <Form.Select
                          type="select"
                          name="kurdish"
                          value={applyForm.kurdish}
                          onChange={onChange}
                          aria-label="Please Select"
                        >
                          <option></option>
                          <option value="None / Hiç ">None / Hiç </option>
                          <option value="Basics / Temel">Basics / Temel</option>
                          <option value="Good / İyi">Good / İyi</option>
                          <option value="Advanced / Gelişmiş">
                            Advanced / Gelişmiş
                          </option>
                          <option value="Fluent / Akıcı , Kusursuz">
                            Fluent / Akıcı , Kusursuz
                          </option>
                          <option value="Native / Ana dili">
                            Native / Ana dili
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput4"
                      >
                        <Form.Label>French / Fransızca</Form.Label>

                        <Form.Select
                          type="select"
                          name="french"
                          value={applyForm.french}
                          onChange={onChange}
                          aria-label="Please Select"
                        >
                          <option></option>
                          <option value="None / Hiç ">None / Hiç </option>
                          <option value="Basics / Temel">Basics / Temel</option>
                          <option value="Good / İyi">Good / İyi</option>
                          <option value="Advanced / Gelişmiş">
                            Advanced / Gelişmiş
                          </option>
                          <option value="Fluent / Akıcı , Kusursuz">
                            Fluent / Akıcı , Kusursuz
                          </option>
                          <option value="Native / Ana dili">
                            Native / Ana dili
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col></Col>
                  </Row>
                </Card.Body>
              </Card>
              <br></br>

              <Card>
                <Card.Header>
                  <Form.Group
                    className="mb-1"
                    controlId="exampleForm.ControlInput4"
                  >
                    <Form.Label>
                      Computer skills / Bilgisayar bilgisi
                    </Form.Label>
                  </Form.Group>
                </Card.Header>
                <Card.Body>
                  <Row>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInput4"
                    >
                      <Form.Label>
                        Computer skills / Bilgisayar bilgisi
                      </Form.Label>
                    </Form.Group>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput4"
                      >
                        <Form.Label>
                          Using Computer / Bilgisayar kullanımı
                        </Form.Label>

                        <Form.Select
                          required
                          type="select"
                          name="usingComputer"
                          value={applyForm.usingComputer}
                          onChange={onChange}
                          aria-label="Please Select"
                        >
                          <option></option>
                          <option value="Begginer / Başlangıç">
                            Begginer / Başlangıç{" "}
                          </option>
                          <option value="Good / İyi">Good / İyi</option>
                          <option value="Advanced / Gelişmiş">
                            Advanced / Gelişmiş
                          </option>
                          <option value="Professional / Profesyonel">
                            Professional / Profesyonel
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput4"
                      >
                        <Form.Label>
                          Microsoft office Package / Microsoft ofis programları
                        </Form.Label>

                        <Form.Select
                          required
                          type="select"
                          name="microsoftOfficePackage"
                          value={applyForm.microsoftOfficePackage}
                          onChange={onChange}
                          aria-label="Please Select"
                        >
                          <option></option>
                          <option value="Begginer / Başlangıç">
                            Begginer / Başlangıç{" "}
                          </option>
                          <option value="Good / İyi">Good / İyi</option>
                          <option value="Advanced / Gelişmiş">
                            Advanced / Gelişmiş
                          </option>
                          <option value="Professional / Profesyonel">
                            Professional / Profesyonel
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <Row>
                <Col>
                  <Form.Group
                    className="mb-3"
                    controlId="exampleForm.ControlInput4"
                  >
                    <Form.Label>
                      Internet and Outlook / İnternet ve outlook kullanımı
                    </Form.Label>

                    <Form.Select
                      required
                      type="select"
                      name="internetOutlook"
                      value={applyForm.internetOutlook}
                      onChange={onChange}
                      aria-label="Please Select"
                    >
                      <option></option>
                      <option value="Begginer / Başlangıç">
                        Begginer / Başlangıç{" "}
                      </option>
                      <option value="Good / İyi">Good / İyi</option>
                      <option value="Advanced / Gelişmiş">
                        Advanced / Gelişmiş
                      </option>
                      <option value="Professional / Profesyonel">
                        Professional / Profesyonel
                      </option>
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col></Col>
              </Row>
              <br></br>
              <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput4"
                      >
                        <Form.Label>
                          Salary Expectations / Maaş beklentisi
                        </Form.Label>

                        <Form.Select
                          type="select"
                          required
                          name="salaryExpectations"
                          value={applyForm.salaryExpectations}
                          onChange={onChange}
                          aria-label="Please Select"
                        >
                          <option></option>
                          <option value="2000 to 3000 TL">
                            2000 to 3000 TL{" "}
                          </option>
                          <option value="2000 to 4000 TL">
                            2000 to 4000 TL
                          </option>
                          <option value="4000 to 5000 TL">
                            4000 to 5000 TL
                          </option>
                          <option value="5000 to 6000 TL">
                            5000 to 6000 TL
                          </option>
                          <option value="6000 to 7000 TL">
                            6000 to 7000 TL
                          </option>
                          <option value="7000 to 8000 TL">
                            7000 to 8000 TL
                          </option>
                          <option value="8000 to 9000 TL">
                            8000 to 9000 TL
                          </option>
                          <option value="9000 to 10000 TL">
                            9000 to 10000 TL
                          </option>
                          <option value="10000 to 11000 TL">
                            10000 to 11000 TL
                          </option>
                          <option value="more than 11000 TL">
                            more than 11000 TL
                          </option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput7"
                      >
                        <Form.Label>
                          please specify your salary expectation if higher than
                          11000 TL / Eğer maaş beklentiniz 11000 TL üzeri ise
                          lütfen belirtiniz
                        </Form.Label>
                        <Form.Control
                          type="text"
                          name="specifySalary"
                          value={applyForm.specifySalary}
                          onChange={onChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput7"
                      >
                        <Form.Label>
                          .Availability, when you're ready to start working with
                          AAR Japan (Keep in mind your current employer notice
                          period) / AAr Japan ile ne zaman çalışmaya
                          başlayabilirsiniz ( Eğer hali hazırda çalışıyorsanız
                          iş yerinden ayrılma süresini göz önünde bulundurunuz
                          lütfen )
                        </Form.Label>
                        <Form.Control
                          type="date"
                          required
                          name="availability"
                          value={applyForm.availability}
                          onChange={onChange}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <br></br>
              <Card>
                <Card.Body>
                  <Row>
                    {/* <Col>
                      <Form.Group controlId="formFilecv" className="mb-3">
                        <Form.Label>CV</Form.Label>
                        <Form.Control
                          type="file"
                          name="cvFileUrl"
                          value={applyForm.cvFileUrl}
                          onChange={onChange}
                        />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formFilecover" className="mb-3">
                        <Form.Label>Cover Letter</Form.Label>
                        <Form.Control
                          type="file"
                          name="coverLetterFileUrl"
                          value={applyForm.coverLetterFileUrl}
                          onChange={onChange}
                        />
                      </Form.Group>
                    </Col> */}
                    {/* <Form.Group controlId="formFilecv" className="mb-3">
                      <Form.Label>CV</Form.Label>
                      <Form.Control
                        type="file"
                        name="cvFileUrl"
                        value={(applyForm.cvFileUrl = fileUrl)}
                        onChange={onChange}
                      />
                    </Form.Group> */}
                    <Col>
                      <Form.Group controlId="formFilecv" className="mb-3">
                        <Form.Label>CV</Form.Label>
                        <AddFileForm
                          basePath={`cvfolder/${currentPost.referanceCode}/${applyForm.fullName}`}
                          personname
                          existingImageUrl={fileUrl}
                          handleUploadFinish={(downloadUrl) =>
                            setFileUrl(downloadUrl)
                          }
                          handleUploadCancel={() => setFileUrl("")}
                        ></AddFileForm>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="formFilecL" className="mb-3">
                        <Form.Label>Cover Letter</Form.Label>
                        <AddFileForm
                          basePath={`cvfolder/${currentPost.referanceCode}/${applyForm.fullName}`}
                          existingImageUrl={clfileUrl}
                          handleUploadFinish={(downloadUrl) =>
                            setClFileUrl(downloadUrl)
                          }
                          handleUploadCancel={() => setClFileUrl("")}
                        ></AddFileForm>
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <br></br>
              <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInput21"
                      >
                        <Form.Label>
                          I have read and understood the Privacy Notice. I give
                          consent for processing my personal data in order to
                          conduct human resource activities within the scope of
                          the Law on Protection of Personal Data No. 6698. For
                          privacy notice, click
                          <ul>
                            <li>
                              {" "}
                              <a
                                target="_blank"
                                href="https://aarturkey.org/kvkk/"
                                rel="noreferrer"
                              >
                                {" "}
                                https://aarturkey.org/kvkk/
                              </a>
                            </li>
                            <li>
                              {" "}
                              <a
                                target="_blank"
                                href="https://tr.aarturkey.org/kvkk/"
                                rel="noreferrer"
                              >
                                {" "}
                                https://tr.aarturkey.org/kvkk/
                              </a>
                            </li>
                          </ul>
                        </Form.Label>
                        <Form.Check
                          required
                          type="checkbox"
                          label="I Accept / Onay / أوافق"
                          id="default-checkbox"
                          name="privacyNoticeAccepted"
                          checked={agreeToAllTerms}
                          onChange={(event) => {
                            handleChangeChk(event);
                          }}
                          value={
                            agreeToAllTerms
                              ? (applyForm.privacyNoticeAccepted = "Accepted")
                              : (applyForm.privacyNoticeAccepted = "Rejected")
                          }
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
              <br></br>
              <div className="d-grid gap-2">
                <Button
                  disabled={!agreeToAllTerms}
                  variant="success"
                  type="submit"
                >
                  Apply Now{" "}
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};
export default AddApplyForm;
