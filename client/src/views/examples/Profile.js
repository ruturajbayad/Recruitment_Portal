/*!

=========================================================
* Argon Dashboard React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
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
// core components
import UserHeader from "components/Headers/UserHeader.js";
import Multiselect from "multiselect-react-dropdown";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {
  const initialUserData = {
    firstName: "",
    lastName: "",
    password: "",
    email: "",
    departments: [],
    UserRole: "",
  };
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
      } catch (error) {}
    }
    fatchData();
    fatchUser();
  }, [id]);

  const EditUser = async (e) => {
    e.preventDefault();
    const { email, firstName, lastName, UserRole, departments } = userData;
    try {
      const response = await axios.post(
        `http://localhost:4000/api/v1/users/updateDetails/${id}`,
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
        toast.success("Successfully Updated User");
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
    // console.log(machingDepartments);
    if (machingDepartments) {
      setUserData((prevUserData) => ({
        ...prevUserData,
        departments: machingDepartments,
      }));
    }
  };
  const handelRemoveD = (remove) => {
    setUserData((prevUserData) => ({
      ...prevUserData,
      departments: prevUserData.departments.filter((d) =>
        remove.includes(d.nameOfDepartment)
      ),
    }));
  };

  const handelChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };
  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <UserHeader />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile shadow">
              <Row className="justify-content-center">
                <Col className="order-lg-2" lg="3">
                  <div className="card-profile-image">
                    <a href="#pablo" onClick={(e) => e.preventDefault()}>
                      <img
                        alt="..."
                        className="rounded-circle"
                        src={require("../../assets/img/theme/profile.jpg")}
                      />
                    </a>
                  </div>
                </Col>
              </Row>
              <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
                {/* <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div> */}
              </CardHeader>
              <CardBody className="pt-0 pt-md-4">
                <Row>
                  <div className="col">
                    <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                      {/* <div>
                        <span className="heading">22</span>
                        <span className="description">Friends</span>
                      </div>
                      <div>
                        <span className="heading">10</span>
                        <span className="description">Photos</span>
                      </div>
                      <div>
                        <span className="heading">89</span>
                        <span className="description">Comments</span>
                      </div> */}
                    </div>
                  </div>
                </Row>
                <div className="text-center">
                  <h3>
                    {userData.firstName} {userData.lastName}
                    {/* <span className="font-weight-light">, 27</span> */}
                  </h3>
                  <div className="h5 font-weight-300">
                    <i className="ni location_pin mr-2" />
                    {userData.UserRole}
                  </div>
                  {/* <div className="h5 mt-4">
                    <i className="ni business_briefcase-24 mr-2" />
                    Solution Manager - Creative Tim Officer
                  </div> */}
                  {/* <div>
                    <i className="ni education_hat mr-2" />
                    University of Computer Science
                  </div> */}
                  <hr className="my-4" />
                  {/* <p>
                    Departments{" "}
                    {userData.departments &&
                      userData.departments.map((department) => {
                        return (
                          <div>
                            <i className="ni education_hat mr-2" />
                            {department}
                          </div>
                        );
                      })}
                  </p> */}
                  {/* <a href="#pablo" onClick={(e) => e.preventDefault()}>
                    Show more
                  </a> */}
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
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
                            name="firstName"
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
                            defaultValue={userData.lastName}
                            id="input-last-name"
                            placeholder="Last name"
                            type="text"
                            name="lastName"
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
                            defaultValue={userData.email}
                            id="input-email"
                            placeholder="ruturaj@example.com"
                            type="email"
                            name="email"
                            onChange={handelChange}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </div>
                  <hr className="my-4" />
                  {/* Address */}
                  <h6 className="heading-small text-muted mb-4">
                    Department info
                  </h6>
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
                              (departmentName) =>
                                departmentName.nameOfDepartment
                            )}
                            placeholder="Select Department"
                          />
                        </FormGroup>
                      </Col>
                      {/* <Col md="6">
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
                            onSelect={function noRefCheck(selectedValues) {
                              setUserData((prevUserData) => ({
                                ...prevUserData,
                                UserRole: selectedValues[0],
                              }));
                            }}
                            singleSelect="false"
                            options={["Admin", "HR", "Technical Person"]}
                            placeholder="Select Role"
                          />
                        </FormGroup>
                      </Col> */}
                    </Row>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
