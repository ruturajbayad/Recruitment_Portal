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
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  Table,
  Container,
  Row,
  UncontrolledTooltip,
} from "reactstrap";

const AllSchedule = () => {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fatchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/schedule/all-schedules",
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
  // console.log(candidates);
  const deleteCandidate = async (e, scheduleId) => {
    e.preventDefault();
    // console.log(userID);
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/schedule/delete-schedule/${scheduleId}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Schdeule Delete Success");
      window.location.reload();
    } catch (error) {
      toast.error("Something went wrong");
    }
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
                    <th scope="col">Interviewer</th>
                    <th scope="col">Date</th>
                    <th scope="col">Time</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((schedule) => (
                    <tr key={schedule._id}>
                      <th scope="row">
                        <Media>
                          <span className="mb-0 text-sm">
                            {/* Display candidate name */}
                            <Link
                              to={`/admin/update-candidate/${schedule.candidateID._id}`}
                              className="text-white"
                            >
                              {schedule.candidateID.Firstname}{" "}
                              {schedule.candidateID.Lastname}
                            </Link>
                          </span>
                        </Media>
                      </th>
                      <th>
                        <Media>
                          <span className="mb-0 text-sm">
                            {/* Display interviewer name */}
                            <Link
                              to={`/admin/update-user/${schedule.interviewer._id}`}
                              className="text-white"
                            ></Link>
                            {schedule.interviewer.firstName}{" "}
                            {schedule.interviewer.lastName}
                          </span>
                        </Media>
                      </th>
                      <td>
                        {/* Display date */}
                        {new Date(schedule.dateTime).toLocaleDateString()}
                      </td>
                      <td>
                        {/* Display time */}
                        {new Date(schedule.dateTime).toLocaleTimeString()}
                      </td>
                      <td className="text-center pr-4 pl-0 ">
                        {/* Dropdown menu for edit/delete options */}
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
                              onClick={(e) => deleteCandidate(e, schedule._id)}
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
export default AllSchedule;
