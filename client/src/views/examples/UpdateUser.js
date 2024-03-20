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

const UpdateUser = () => {
  const initialUserData = {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    departments: [],
    UserRole: "",
  };
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [departments, setDepartment] = useState([]);
  const [UserRole, setRole] = useState("");
  const [userData, setUserData] = useState(initialUserData);
  const [options, setOptions] = useState([]);
  const { id } = useParams();
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
    async function fatchUser() {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/v1/users/get-user/${id}`,
          {
            withCredentials: true,
          }
        );
        setUserData(response.data.data);
        // console.log(response.data.data);
      } catch (error) {}
    }

    fatchData();
    fatchUser();
  }, [id]);
  const EditUser = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/v1/users/updateDetails`,
        {
          firstName,
          lastName,
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
                <h3 className="mb-0">Edit Users</h3>
              </Col>
              <Col className="text-right" xs="4">
                <Button
                  color="primary"
                  href="#pablo"
                  onClick={(e) => EditUser(e)}
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
                User information
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
                        defaultValue={userData.firstName}
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
                        defaultValue={userData.lastName}
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
                        defaultValue={userData.email}
                        id="input-email"
                        placeholder="ruturaj@example.com"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>
              </div>
              <hr className="my-4" />
              {/* Address */}
              <h6 className="heading-small text-muted mb-4">Department info</h6>
              <div className="pl-lg-4">
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-password"
                      >
                        Department
                      </label>
                      <Multiselect
                        selectedValues={userData.departments.map(
                          (department) => department.nameOfDepartment
                        )}
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
                  <Col md="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-password"
                      >
                        Role
                      </label>
                      <Multiselect
                        selectedValues={[userData.UserRole]}
                        className="form-control-alternative"
                        isObject={false}
                        onKeyPressFn={function noRefCheck() {}}
                        onRemove={function noRefCheck() {}}
                        onSearch={function noRefCheck() {}}
                        onSelect={function noRefCheck(e) {
                          setRole(e.at(0));
                        }}
                        singleSelect="false"
                        options={["Admin", "HR", "Technical Person"]}
                        placeholder="Select Role"
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

export default UpdateUser;
