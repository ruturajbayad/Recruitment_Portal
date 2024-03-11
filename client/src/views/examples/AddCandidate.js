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

const AddCandidate = () => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [departments, setDepartment] = useState([]);
  const [UserRole, setRole] = useState("");
  const [options, setOptions] = useState([]);
  const [currentlyWorking, setCurrentlyWorking] = useState("");
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
  const AddUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/addUser",
        {
          firstName,
          lastName,
          password,
          email,
          UserRole,
          departments,
        },
        {
          withCredentials: true,
        }
      );
      if (response.data.statusCode === 200) {
        toast.success("Successfully Created User");
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
                <h3 className="mb-0">Add Candidate</h3>
              </Col>
              <Col className="text-right" xs="4">
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={(e) => AddUser(e)}
                  size="medium"
                >
                  Add
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
                        // defaultValue="Lucky"
                        id="input-first-name"
                        placeholder="First name"
                        type="text"
                        onChange={(e) => setFirstname(e.target.value)}
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
                        // defaultValue="Jesse"
                        id="input-last-name"
                        placeholder="Last name"
                        type="text"
                        onChange={(e) => setLastname(e.target.value)}
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
                        placeholder="ruturaj@example.com"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
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
                        placeholder="Mobile Number"
                        type="text"
                        onChange={(e) => setPassword(e.target.value)}
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
                        placeholder="DoB"
                        type="Date"
                        onChange={(e) => setPassword(e.target.value)}
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
                        isObject={false}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        onSelect={function noRefCheck(e) {
                          setRole(e.at(0));
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
                        // defaultValue="Lucky"
                        id="input-first-name"
                        placeholder="Experiance Please Enter in form of Year"
                        type="text"
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
                        Gender
                      </label>
                      <Multiselect
                        className="form-control-alternative bg-white"
                        isObject={false}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        onSelect={function noRefCheck(e) {
                          setRole(e.at(0));
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
                        isObject={false}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        onSelect={function noRefCheck(e) {
                          setRole(e.at(0));
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
                        isObject={false}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        onSelect={function noRefCheck(e) {
                          setCurrentlyWorking(e.at(0));
                        }}
                        singleSelect="false"
                        options={["Yes", "No"]}
                        placeholder="Select Role"
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
                        // defaultValue="Lucky"
                        id="input-first-name"
                        placeholder="Upload your Resume"
                        type="file"
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
                        Department
                      </label>
                      <Multiselect
                        className="form-control-alternative"
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
                </Row>
              </div>
              <hr className="my-4" />
              {/* Address */}
              {currentlyWorking === "Yes" && (
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
                          // defaultValue="Lucky"
                          id="input-first-name"
                          placeholder="Company Name"
                          type="text"
                          onChange={(e) => setFirstname(e.target.value)}
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
                          // defaultValue="Lucky"
                          id="input-first-name"
                          placeholder="Enter CTC in Number"
                          type="text"
                          onChange={(e) => setFirstname(e.target.value)}
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
                          // defaultValue="Lucky"
                          id="input-first-name"
                          placeholder="Enter ETC"
                          type="text"
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
                          isNegotiable
                        </label>
                        <Multiselect
                          className="form-control-alternative bg-white"
                          isObject={false}
                          onKeyPressFn={function noRefCheck() {}}
                          onRemove={function noRefCheck() {}}
                          onSearch={function noRefCheck() {}}
                          onSelect={function noRefCheck(e) {
                            setCurrentlyWorking(e.at(0));
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
                          // defaultValue="Lucky"
                          id="input-first-name"
                          placeholder="Why would you like to change"
                          type="text"
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
                          Notice Period
                        </label>
                        <Multiselect
                          className="form-control-alternative bg-white"
                          isObject={false}
                          onKeyPressFn={function noRefCheck() {}}
                          onRemove={function noRefCheck() {}}
                          onSearch={function noRefCheck() {}}
                          onSelect={function noRefCheck(e) {
                            setCurrentlyWorking(e.at(0));
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
                          isObject={false}
                          onKeyPressFn={function noRefCheck() {}}
                          onRemove={function noRefCheck() {}}
                          onSearch={function noRefCheck() {}}
                          onSelect={function noRefCheck(e) {
                            setCurrentlyWorking(e.at(0));
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
              {/* <Row>
                  <Col lg="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-city"
                      >
                        City
                      </label>
                      <Input
                        className="form-control-alternative"
                        defaultValue="New York"
                        id="input-city"
                        placeholder="City"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-country"
                      >
                        Country
                      </label>
                      <Input
                        className="form-control-alternative"
                        defaultValue="United States"
                        id="input-country"
                        placeholder="Country"
                        type="text"
                      />
                    </FormGroup>
                  </Col>
                  <Col lg="4">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-country"
                      >
                        Postal code
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-postal-code"
                        placeholder="Postal code"
                        type="number"
                      />
                    </FormGroup>
                  </Col>
                </Row> */}

              {/* <hr className="my-4" /> */}
              {/* Description */}
              {/* <h6 className="heading-small text-muted mb-4">About me</h6>
              <div className="pl-lg-4">
                <FormGroup>
                  <label>About Me</label>
                  <Input
                    className="form-control-alternative"
                    placeholder="A few words about you ..."
                    rows="4"
                    defaultValue="A beautiful Dashboard for Bootstrap 4. It is Free and
                        Open Source."
                    type="textarea"
                  />
                </FormGroup>
              </div> */}
            </Form>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};

export default AddCandidate;
