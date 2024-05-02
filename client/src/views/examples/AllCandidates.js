import axios from "axios";
import EmployeeHeader from "components/Headers/EmployeeHeader";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
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

const AllCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fatchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/candidates/show-candidate",
          {
            withCredentials: true,
          }
        );
        const result = response.data.data;
        // console.log(result);
        setCandidates(result);
      } catch (error) {
        toast.error("Something went wrong");
      }
    };
    fatchData();
  }, []);

  const deleteCandidate = async (e, candidateID) => {
    e.preventDefault();
    // console.log(userID);
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/candidates/delete-candidate/${candidateID}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Candidate deleted successfully");
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const editcandidate = (e, candidateID) => {
    e.preventDefault();
    navigate(`/admin/update-candidate/${candidateID}`);
  };

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
                <h3 className="text-white mb-0">Candidates</h3>
              </CardHeader>
              <Table
                className="align-items-center table-dark table-flush"
                responsive
              >
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Candidate</th>
                    <th scope="col">Education</th>
                    <th scope="col">Status Of isInterview</th>
                    <th scope="col">Department</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((candidate) => (
                    <tr key={candidate._id}>
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
                              to={`/admin/update-candidate/${candidate._id}`}
                              className="text-white"
                            >
                              {candidate.Firstname} {candidate.Lastname}{" "}
                            </Link>
                          </span>
                        </Media>
                        {/* </Media> */}
                      </th>
                      <td>{candidate.education}</td>
                      <td>
                        <Badge color="" className="badge-dot mr-4">
                          <i
                            className={`${
                              candidate.isNegotiable
                                ? "bg-success"
                                : "bg-warning"
                            }`}
                          />
                          {candidate.isNegotiable ? "Yes" : "No"}
                        </Badge>
                      </td>
                      <td className="pr-1 pl-3">
                        <div className="avatar-group">
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip731399078"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("../../assets/img/theme/angular.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip731399078"
                          >
                            Angular
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip491083084"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              src={require("../../assets/img/theme/bootstrap.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip491083084"
                          >
                            Bootstrap
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip528540780"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("../../assets/img/theme/react.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip528540780"
                          >
                            React
                          </UncontrolledTooltip>
                          <a
                            className="avatar avatar-sm"
                            href="#pablo"
                            id="tooltip237898869"
                            onClick={(e) => e.preventDefault()}
                          >
                            <img
                              alt="..."
                              className="rounded-circle"
                              src={require("../../assets/img/theme/vue.jpg")}
                            />
                          </a>
                          <UncontrolledTooltip
                            delay={0}
                            target="tooltip237898869"
                          >
                            vue
                          </UncontrolledTooltip>
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
                              href="#pablo"
                              onClick={(e) => editcandidate(e, candidate._id)}
                            >
                              Edit
                            </DropdownItem>
                            <DropdownItem
                              href="#pablo"
                              onClick={(e) => deleteCandidate(e, candidate._id)}
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
export default AllCandidates;
