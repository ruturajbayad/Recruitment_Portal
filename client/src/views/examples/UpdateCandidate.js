import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
import Multiselect from "multiselect-react-dropdown";
import EmployeeHeader from "components/Headers/EmployeeHeader";
import axios from "axios";
import { useParams } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const UpdateCandidate = () => {
  const { id } = useParams();
  const initialData = {
    Firstname: "",
    Lastname: "",
    email: "",
    mobileNo: "",
    DoB: "",
    education: "",
    experiance: "",
    gender: "",
    WorkLocation: "",
    CurrentCompany: false,
    isCurrentlyWorking: "",
    CTC: "",
    ETC: "",
    isNegotiable: false,
    ReasonforChange: "",
    NoticePeriod: 0,
    isAnyGap: false,
    departments: [],
  };
  const [options, setOptions] = useState([]);
  const [resume, setResume] = useState();
  const [candidateData, setCandidateData] = useState(initialData);
  // const navigates = useNavigate();
  useEffect(() => {
    async function fatchData() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/department/departments"
        );
        setOptions(response.data.data);
      } catch (error) {
        throw new Error(error.message);
      }
    }

    async function fatchCandidateData() {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/candidates/get-candidate/${id}`,
          {
            withCredentials: true,
          }
        );
        setCandidateData(response.data.data);
      } catch (error) {
        toast.error("candidate not found");
      }
    }
    fatchCandidateData();
    fatchData();
  }, [id]);

  const AddCandidate = async (e) => {
    e.preventDefault();
    const {
      Firstname,
      Lastname,
      email,
      mobileNo,
      DoB,
      education,
      gender,
      WorkLocation,
      CurrentCompany,
      isCurrentlyWorking,
      CTC,
      ETC,
      isNegotiable,
      ReasonforChange,
      NoticePeriod,
      isAnyGap,
      experiance,
      departments,
    } = candidateData;
    try {
      const formData = new FormData();
      formData.append("Firstname", Firstname);
      formData.append("Lastname", Lastname);
      formData.append("email", email);
      formData.append("mobileNo", mobileNo);
      formData.append("DoB", DoB);
      formData.append("education", education);
      formData.append("gender", gender);
      formData.append("WorkLocation", WorkLocation);
      formData.append("CurrentCompany", CurrentCompany);
      formData.append("isCurrentlyWorking", isCurrentlyWorking);
      formData.append("CTC", CTC);
      formData.append("ETC", ETC);
      formData.append("isNegotiable", isNegotiable);
      formData.append("ReasonforChange", ReasonforChange);
      formData.append("NoticePeriod", NoticePeriod);
      formData.append("isAnyGap", isAnyGap);
      formData.append("experiance", experiance);
      formData.append("resume", resume);

      departments.forEach((departmentId) => {
        formData.append("departments", departmentId._id);
      });
      const response = await axios.post(
        `http://localhost:4000/api/v1/candidates/update-candidate/${id}`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.statusCode === 200) {
        toast.success("Successfully Updated Candidate");
        window.location.reload();
      }
    } catch (error) {
      toast.error("All Fields Required");
    }
  };
  const handelAdd = (departmentName) => {
    const machingDepartments = options.filter((option) =>
      departmentName.includes(option.nameOfDepartment)
    );
    if (machingDepartments) {
      console.log(machingDepartments);
      setCandidateData((prevData) => ({
        ...prevData,
        departments: machingDepartments,
      }));
    }
  };
  const handelRemoveD = (remove) => {
    setCandidateData((prevData) => ({
      ...prevData,
      departments: prevData.departments.filter((d) =>
        remove.includes(d.nameOfDepartment)
      ),
    }));
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setCandidateData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <EmployeeHeader />
      <Container className="mt--7" fluid>
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Edit Candidate</h3>
              </Col>
              <Col className="text-right" xs="4">
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={(e) => AddCandidate(e)}
                  size="medium"
                >
                  Update
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form>
              <h6 className="heading-small text-muted mb-4">
                Candidate information
              </h6>
              <div className="pl-lg-4">
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        First name
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-first-name"
                        defaultValue={candidateData.Firstname}
                        placeholder="First name"
                        type="text"
                        name="Firstname"
                        onChange={handelChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-last-name"
                      >
                        Last name
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-last-name"
                        defaultValue={candidateData.Lastname}
                        placeholder="Last name"
                        type="text"
                        name="Lastname"
                        onChange={handelChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-email"
                      >
                        Email address
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-email"
                        defaultValue={candidateData.email}
                        placeholder="ruturaj@example.com"
                        type="email"
                        name="email"
                        onChange={handelChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-number"
                      >
                        Mobile Number
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-number"
                        defaultValue={candidateData.mobileNo}
                        placeholder="Mobile Number"
                        type="text"
                        name="mobileNo"
                        onChange={handelChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-number"
                      >
                        Date of Birth
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-number"
                        defaultValue={candidateData.DoB}
                        placeholder="DoB"
                        type="Date"
                        name="DoB"
                        onChange={handelChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-education"
                      >
                        Education
                      </label>
                      <Multiselect
                        className="form-control-alternative bg-white "
                        selectedValues={[candidateData.education]}
                        isObject={false}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        onSelect={function noRefCheck(e) {
                          setCandidateData((prevData) => ({
                            ...prevData,
                            education: e[0],
                          }));
                        }}
                        singleSelect="false"
                        options={[
                          "BSC",
                          "MSC",
                          "BE IT",
                          "BE Computer",
                          "ME IT",
                          "ME Computer",
                          "Other",
                        ]}
                        placeholder="Select Highest Education"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Experiance
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-first-name"
                        defaultValue={candidateData.experiance}
                        placeholder="Experiance Please Enter in form of Year"
                        type="text"
                        name="experiance"
                        onChange={handelChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-password"
                      >
                        Gender
                      </label>
                      <Multiselect
                        className="form-control-alternative bg-white"
                        selectedValues={[candidateData.gender]}
                        isObject={false}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        onSelect={function noRefCheck(e) {
                          setCandidateData((prevData) => ({
                            ...prevData,
                            gender: e[0],
                          }));
                        }}
                        singleSelect="false"
                        options={["Male", "Female", "Other"]}
                        placeholder="Select Gender"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-password"
                      >
                        Work Location
                      </label>
                      <Multiselect
                        className="form-control-alternative bg-white"
                        selectedValues={[candidateData.WorkLocation]}
                        isObject={false}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        onSelect={function noRefCheck(e) {
                          setCandidateData((prevData) => ({
                            ...prevData,
                            WorkLocation: e[0],
                          }));
                        }}
                        singleSelect="false"
                        options={[
                          "Work from Home",
                          "Work From Office",
                          "Hybrid",
                        ]}
                        placeholder="Select Work Location"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-password"
                      >
                        Currently Working
                      </label>
                      <Multiselect
                        className="form-control-alternative bg-white"
                        selectedValues={[
                          candidateData.isCurrentlyWorking === true
                            ? "Yes"
                            : "No",
                        ]}
                        isObject={false}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        onSelect={function noRefCheck(e) {
                          setCandidateData((prevData) => ({
                            ...prevData,
                            isCurrentlyWorking: e[0] === "Yes" ? true : false,
                          }));
                        }}
                        singleSelect="false"
                        options={["Yes", "No"]}
                        placeholder="Select Currently Working"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-first-name"
                      >
                        Upload Resume
                      </label>
                      <Input
                        className="form-control-alternative bg-white"
                        id="input-first-name"
                        placeholder="Upload your Resume"
                        type="file"
                        accept="image/*,.pdf"
                        onChange={(e) => setResume(e.target.files[0])}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-password"
                      >
                        Department
                      </label>
                      <Multiselect
                        className="form-control-alternative bg-white"
                        selectedValues={candidateData.departments.map(
                          (department) => department.nameOfDepartment
                        )}
                        isObject={false}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={handelRemoveD}
                        onSearch={function noRefCheck() {}}
                        onSelect={handelAdd}
                        options={options.map(
                          (departmentName) => departmentName.nameOfDepartment
                        )}
                        placeholder="Select Department"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
              <hr className="my-4" />
              {/* Address */}
              {candidateData.isCurrentlyWorking === true && (
                <div className="pl-4">
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-first-name"
                        >
                          Company Name
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-first-name"
                          defaultValue={candidateData.CurrentCompany}
                          placeholder="Company Name"
                          type="text"
                          name="CurrentCompany"
                          onChange={handelChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-first-name"
                        >
                          CTC
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-first-name"
                          defaultValue={candidateData.CTC}
                          placeholder="Enter CTC in Number"
                          type="text"
                          name="CTC"
                          onChange={handelChange}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-first-name"
                        >
                          ETC
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-first-name"
                          defaultValue={candidateData.ETC}
                          placeholder="Enter ETC"
                          type="text"
                          name="ETC"
                          onChange={handelChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-password"
                        >
                          isNegotiable
                        </label>
                        <Multiselect
                          className="form-control-alternative bg-white"
                          selectedValues={[
                            candidateData.isNegotiable === true ? "Yes" : "No",
                          ]}
                          isObject={false}
                          onKeyPressFn={function noRefCheck() {}}
                          onRemove={function noRefCheck() {}}
                          onSearch={function noRefCheck() {}}
                          onSelect={function noRefCheck(e) {
                            setCandidateData((prevData) => ({
                              ...prevData,
                              isNegotiable: e.at(0) === "Yes" ? true : false,
                            }));
                          }}
                          singleSelect="false"
                          options={["Yes", "No"]}
                          placeholder="Select"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-first-name"
                        >
                          Reason for Change
                        </label>
                        <Input
                          className="form-control-alternative"
                          id="input-first-name"
                          defaultValue={candidateData.ReasonforChange}
                          placeholder="Why would you like to change"
                          type="text"
                          name="ReasonforChange"
                          onChange={handelChange}
                        />
                      </FormGroup>
                    </Col>
                    <Col md="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-password"
                        >
                          Notice Period
                        </label>
                        <Multiselect
                          className="form-control-alternative bg-white"
                          selectedValues={[candidateData.NoticePeriod]}
                          isObject={false}
                          onKeyPressFn={function noRefCheck() {}}
                          onRemove={function noRefCheck() {}}
                          onSearch={function noRefCheck() {}}
                          onSelect={function noRefCheck(e) {
                            setCandidateData((prevData) => ({
                              ...prevData,
                              NoticePeriod: e[0],
                            }));
                          }}
                          singleSelect="false"
                          options={["Imediate", "Less than 15", "30+ days "]}
                          placeholder="Select"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="6">
                      <FormGroup>
                        <label
                          className="form-control-label"
                          htmlFor="input-password"
                        >
                          Any Gap
                        </label>
                        <Multiselect
                          className="form-control-alternative bg-white"
                          selectedValues={[
                            candidateData.isAnyGap === true ? "Yes" : "No",
                          ]}
                          isObject={false}
                          onKeyPressFn={function noRefCheck() {}}
                          onRemove={function noRefCheck() {}}
                          onSearch={function noRefCheck() {}}
                          onSelect={function noRefCheck(e) {
                            setCandidateData((prevData) => ({
                              ...prevData,
                              isAnyGap: e.at(0) === "Yes" ? true : false,
                            }));
                          }}
                          singleSelect="false"
                          options={["Yes", "No"]}
                          placeholder="Any Gap"
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </div>
              )}
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default UpdateCandidate;
