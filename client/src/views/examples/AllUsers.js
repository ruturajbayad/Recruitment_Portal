import axios from "axios";
import EmployeeHeader from "components/Headers/EmployeeHeader";
// import Loder from "components/Loder/Loder";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
// import { RotatingLines } from "react-loader-spinner";
// reactstrap components
import {
  Badge,
  Card,
  CardHeader,
  // CardFooter,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  // Pagination,
  // PaginationItem,
  // PaginationLink,
  // Progress,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  // const [isLodaing, setLoding] = useState(true);
  useEffect(() => {
    const fatchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/users/all-users",
          {
            withCredentials: true,
          }
        );
        // setTimeout(() => {
        //   setLoding(false);
        // }, 2000);
        const result = response.data.data;
        setUsers(result);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    fatchData();
  }, []);

  const deleteUser = async (e, userID) => {
    e.preventDefault();
    // console.log(userID);
    try {
      await axios.post(
        `http://localhost:4000/api/v1/users/delete-user/${userID}`,
        {
          withCredentials: true,
        }
      );
      toast.success("User deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  const editUser = (e, userID) => {
    e.preventDefault();
    navigate(`/admin/user-profile/${userID}`);
  };

  // if (isLodaing) {
  //   return <Loder />;
  // }

  return (
    <>
      <Toaster />
      <EmployeeHeader />
      <Container className="mt--9" fluid>
        {/* Dark table */}
        <Row className="mt-5">
          <div className="col">
            <Card className="bg-default shadow">
              <CardHeader className="bg-transparent border-0">
                <h3 className="text-white mb-0">Users</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">User</th>
                    <th scope="col">Role</th>
                    <th scope="col">Interviewer</th>
                    <th scope="col">Department</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <th scope="row">
                        {/* <Media className="align-items-center">
                        <a
                          className="avatar rounded-circle mr-3"
                          href="#pablo"
                          onClick={(e) => e.preventDefault()}
                        >
                          <img
                            alt="..."
                            src={require("../../assets/img/theme/bootstrap.jpg")}
                          />
                        </a> */}
                        <Media>
                          <span className="mb-0 text-sm">
                            <Link
                              to={`/admin/user-profile/${user._id}`}
                              className="text-white"
                            >
                              {user.firstName} {user.lastName}
                            </Link>
                          </span>
                        </Media>
                        {/* </Media> */}
                      </th>
                      <td>{user.UserRole}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i
                            className={`${
                              user.isInterviewer ? "bg-success" : "bg-warning"
                            }`}
                          />
                          {user.isInterviewer ? "Yes" : "No"}
                        </Badge>
                      </td>
                      <td className="pr-1 pl-3">
                        <div className="avatar-group">
                          {user.departments.map((department) => {
                            return (
                              <React.Fragment key={department.id}>
                                <a
                                  className="avatar avatar-sm"
                                  href="#pablo"
                                  id="tooltip731399078"
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <img
                                    alt="..."
                                    src={require(`../../assets/img/theme/${department.nameOfDepartment}.jpg`)}
                                  />
                                </a>
                                <UncontrolledTooltip
                                  delay={0}
                                  target="tooltip731399078"
                                >
                                  {department.nameOfDepartment}
                                </UncontrolledTooltip>
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </td>
                      <td className="text-center pr-4 pl-0 ">
                        <UncontrolledDropdown>
                          <DropdownToggle
                            className="btn-icon-only text-light"
                            href="#pablo"
                            role="button"
                            size="sm"
                            color=""
                            onClick={(e) => e.preventDefault()}
                          >
                            <i className="fas fa-ellipsis-v" />
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-arrow" right>
                            <DropdownItem
                              href="//user-profile/:id"
                              onClick={(e) => editUser(e, user._id)}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => deleteUser(e, user._id)}
                            >
                              Delete
                            </DropdownItem>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  );
};
export default AllUsers;
