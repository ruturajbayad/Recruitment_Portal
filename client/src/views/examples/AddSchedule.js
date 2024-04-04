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
// import { useNavigate } from "react-router-dom";

const AddSchedule = () => {
  const [Firstname, setFirstname] = useState("");
  const [Lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNo, setMobileNO] = useState(0);
  const [Dob, setDob] = useState("");
  const [education, setEducation] = useState("");
  const [experiance, setExperiance] = useState("");
  const [gender, setGender] = useState("");
  const [workLocation, setWorkLocation] = useState("");
  const [currentCompany, setCurrentCompany] = useState(false);
  const [currentlyWorking, setCurrentlyWorking] = useState();
  const [CTC, setCTC] = useState("");
  const [ETC, setETC] = useState("");
  const [isNegotiable, setIsNegotiable] = useState(false);
  const [reasonforChange, setReasonforChange] = useState("");
  const [noticePeriod, setNoticePeriod] = useState(0);
  const [isAnyGap, setIsAnyGap] = useState(false);
  const [options, setOptions] = useState([]);
  const [resume, setResume] = useState();
  const [departments, setDepartment] = useState([]);
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
    fatchData();
  }, []);

  const AddCandidate = async (e) => {
    e.preventDefault();
    // console.log(departments);
    try {
      const formData = new FormData();
      formData.append("Firstname", Firstname);
      formData.append("Lastname", Lastname);
      formData.append("email", email);
      formData.append("mobileNo", mobileNo);
      formData.append("DoB", Dob);
      formData.append("education", education);
      formData.append("gender", gender);
      formData.append("WorkLocation", workLocation);
      formData.append("CurrentCompany", currentCompany);
      formData.append("isCurrentlyWorking", currentlyWorking);
      formData.append("CTC", CTC);
      formData.append("ETC", ETC);
      formData.append("isNegotiable", isNegotiable);
      formData.append("ReasonforChange", reasonforChange);
      formData.append("NoticePeriod", noticePeriod);
      formData.append("isAnyGap", isAnyGap);
      formData.append("experiance", experiance);
      formData.append("resume", resume);
      formData.append("departments", departments);
      // console.log(Firstname, Lastname, email, isAnyGap);
      // for (const pair of formData.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }
      const response = await axios.post(
        "http://localhost:4000/api/v1/candidates/uploadCandidateDetails",
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.statusCode === 200) {
        toast.success("Successfully Added Candidate");
        window.location.reload();
      }
    } catch (error) {
      toast.error("All Fields Required");
      // throw new Error(error.message);
    }
  };
  const handelAdd = (departmentName) => {
    const machingDepartments = options.filter((option) =>
      departmentName.includes(option.nameOfDepartment)
    );
    if (machingDepartments) {
      setDepartment(machingDepartments.map((departmentId) => departmentId._id));
    }
  };
  const handelRemoveD = (remove) => {
    setDepartment(departments.filter((d) => d !== remove));
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
                <h3 className="mb-0">Create Schdule</h3>
              </Col>
              <Col className="text-right" xs="4">
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={(e) => AddCandidate(e)}
                  size="medium"
                >
                  Create
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form>
              <h6 className="heading-small text-muted mb-4">Schdule Info</h6>
              <div className="pl-lg-4">
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-password"
                      >
                        Select Department
                      </label>
                      <Multiselect
                        className="form-control-alternative bg-white"
                        isObject={false}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={handelRemoveD}
                        onSearch={function noRefCheck() {}}
                        onSelect={handelAdd}
                        options={options.map(
                          (departmentName) => departmentName.nameOfDepartment
                        )}
                        placeholder="Select Department"
                        onChange={(e) => setFirstname(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-password"
                      >
                        Select Candidate
                      </label>
                      <Multiselect
                        className="form-control-alternative bg-white"
                        isObject={false}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        onSelect={function noRefCheck(e) {
                          setWorkLocation(e.at(0));
                        }}
                        singleSelect="false"
                        options={[
                          "Work from Home",
                          "Work From Office",
                          "Hybrid",
                        ]}
                        placeholder="Select Candidate"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-number"
                      >
                        Select Date of Interview
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-number"
                        placeholder="DoB"
                        type="Date"
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-number"
                      >
                        Time Of Interview
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-number"
                        placeholder="Interview Time"
                        type="text"
                        onChange={(e) => setMobileNO(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-password"
                      >
                        Select Interviewer
                      </label>
                      <Multiselect
                        className="form-control-alternative bg-white"
                        isObject={false}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        onSelect={function noRefCheck(e) {
                          setWorkLocation(e.at(0));
                        }}
                        singleSelect="false"
                        options={[
                          "Work from Home",
                          "Work From Office",
                          "Hybrid",
                        ]}
                        placeholder="Select Interviewer"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-education"
                      >
                        Interview round
                      </label>
                      <Multiselect
                        className="form-control-alternative bg-white "
                        isObject={false}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        onSelect={function noRefCheck(e) {
                          setEducation(e.at(0));
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
                        placeholder="Select round"
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default AddSchedule;
