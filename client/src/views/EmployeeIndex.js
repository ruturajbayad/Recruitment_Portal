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
// import { useState } from "react";
// // node.js library that concatenates classes (strings)
// import classnames from "classnames";
// // javascipt plugin for creating charts
// import Chart from "chart.js";
// // react plugin used to create charts
// import { Line, Bar } from "react-chartjs-2";
// // reactstrap components
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   NavItem,
//   NavLink,
//   Nav,
//   Progress,
//   Table,
//   Container,
//   Row,
//   Col,
// } from "reactstrap";

// // core components
// import {
//   chartOptions,
//   parseOptions,
//   chartExample1,
//   chartExample2,
// } from "variables/charts.js";

// import Tables from "./examples/Tables";
// import Header from "components/Headers/Header.js";
import EmployeeHeader from "components/Headers/EmployeeHeader";

// const EmployeeIndex = (props) => {
//   const [activeNav, setActiveNav] = useState(1);
//   const [chartExample1Data, setChartExample1Data] = useState("data1");

//   if (window.Chart) {
//     parseOptions(Chart, chartOptions());
//   }

//   const toggleNavs = (e, index) => {
//     e.preventDefault();
//     setActiveNav(index);
//     setChartExample1Data("data" + index);
//   };
//   return (
//     <>
//       {/* <Header /> */}
//       <EmployeeHeader />
//       <Tables />
//       {/* Page content */}

//       {/* <Container className="mt--7" fluid>
//         <Row>
//           <Col className="mb-5 mb-xl-0" xl="8">
//             <Card className="bg-gradient-default shadow"> */}

//       {/* <CardHeader className="bg-transparent">
//                 <Row className="align-items-center">
//                   <div className="col">
//                     <h6 className="text-uppercase text-light ls-1 mb-1">
//                       Overview
//                     </h6>
//                     <h2 className="text-white mb-0">Sales value</h2>
//                   </div>
//                   <div className="col">
//                     <Nav className="justify-content-end" pills>
//                       <NavItem>
//                         <NavLink
//                           className={classnames("py-2 px-3", {
//                             active: activeNav === 1,
//                           })}
//                           href="#pablo"
//                           onClick={(e) => toggleNavs(e, 1)}
//                         >
//                           <span className="d-none d-md-block">Month</span>
//                           <span className="d-md-none">M</span>
//                         </NavLink>
//                       </NavItem>
//                       <NavItem>
//                         <NavLink
//                           className={classnames("py-2 px-3", {
//                             active: activeNav === 2,
//                           })}
//                           data-toggle="tab"
//                           href="#pablo"
//                           onClick={(e) => toggleNavs(e, 2)}
//                         >
//                           <span className="d-none d-md-block">Week</span>
//                           <span className="d-md-none">W</span>
//                         </NavLink>
//                       </NavItem>
//                     </Nav>
//                   </div>
//                 </Row>
//               </CardHeader> */}

//       {/* <CardBody> */}

//       {/* Chart */}
//       {/* <div className="chart">
//                   <Line
//                     data={chartExample1[chartExample1Data]}
//                     options={chartExample1.options}
//                     getDatasetAtEvent={(e) => console.log(e)}
//                   />
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//           <Col xl="4">
//             <Card className="shadow">
//               <CardHeader className="bg-transparent">
//                 <Row className="align-items-center">
//                   <div className="col">
//                     <h6 className="text-uppercase text-muted ls-1 mb-1">
//                       Performance
//                     </h6>
//                     <h2 className="mb-0">Total orders</h2>
//                   </div>
//                 </Row>
//               </CardHeader>
//               <CardBody> */}

//       {/* Chart */}
//       {/* <div className="chart">
//                   <Bar
//                     data={chartExample2.data}
//                     options={chartExample2.options}
//                   />
//                 </div>
//               </CardBody>
//             </Card>
//           </Col>
//         </Row>
//         <Row className="mt-5">
//           <Col className="mb-5 mb-xl-0" xl="8">
//             <Card className="shadow">
//               <CardHeader className="border-0">
//                 <Row className="align-items-center">
//                   <div className="col">
//                     <h3 className="mb-0">Page visits</h3>
//                   </div>
//                   <div className="col text-right">
//                     <Button
//                       color="primary"
//                       href="#pablo"
//                       onClick={(e) => e.preventDefault()}
//                       size="sm"
//                     >
//                       See all
//                     </Button>
//                   </div>
//                 </Row>
//               </CardHeader>
//               <Table className="align-items-center table-flush" responsive>
//                 <thead className="thead-light">
//                   <tr>
//                     <th scope="col">Page name</th>
//                     <th scope="col">Visitors</th>
//                     <th scope="col">Unique users</th>
//                     <th scope="col">Bounce rate</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <th scope="row">/argon/</th>
//                     <td>4,569</td>
//                     <td>340</td>
//                     <td>
//                       <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">/argon/index.html</th>
//                     <td>3,985</td>
//                     <td>319</td>
//                     <td>
//                       <i className="fas fa-arrow-down text-warning mr-3" />{" "}
//                       46,53%
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">/argon/charts.html</th>
//                     <td>3,513</td>
//                     <td>294</td>
//                     <td>
//                       <i className="fas fa-arrow-down text-warning mr-3" />{" "}
//                       36,49%
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">/argon/tables.html</th>
//                     <td>2,050</td>
//                     <td>147</td>
//                     <td>
//                       <i className="fas fa-arrow-up text-success mr-3" /> 50,87%
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">/argon/profile.html</th>
//                     <td>1,795</td>
//                     <td>190</td>
//                     <td>
//                       <i className="fas fa-arrow-down text-danger mr-3" />{" "}
//                       46,53%
//                     </td>
//                   </tr>
//                 </tbody>
//               </Table>
//             </Card>
//           </Col>
//           <Col xl="4">
//             <Card className="shadow">
//               <CardHeader className="border-0">
//                 <Row className="align-items-center">
//                   <div className="col">
//                     <h3 className="mb-0">Social traffic</h3>
//                   </div>
//                   <div className="col text-right">
//                     <Button
//                       color="primary"
//                       href="#pablo"
//                       onClick={(e) => e.preventDefault()}
//                       size="sm"
//                     >
//                       See all
//                     </Button>
//                   </div>
//                 </Row>
//               </CardHeader>
//               <Table className="align-items-center table-flush" responsive>
//                 <thead className="thead-light">
//                   <tr>
//                     <th scope="col">Referral</th>
//                     <th scope="col">Visitors</th>
//                     <th scope="col" />
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr>
//                     <th scope="row">Facebook</th>
//                     <td>1,480</td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">60%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="60"
//                             barClassName="bg-gradient-danger"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">Facebook</th>
//                     <td>5,480</td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">70%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="70"
//                             barClassName="bg-gradient-success"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">Google</th>
//                     <td>4,807</td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">80%</span>
//                         <div>
//                           <Progress max="100" value="80" />
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">Instagram</th>
//                     <td>3,678</td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">75%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="75"
//                             barClassName="bg-gradient-info"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                   <tr>
//                     <th scope="row">twitter</th>
//                     <td>2,645</td>
//                     <td>
//                       <div className="d-flex align-items-center">
//                         <span className="mr-2">30%</span>
//                         <div>
//                           <Progress
//                             max="100"
//                             value="30"
//                             barClassName="bg-gradient-warning"
//                           />
//                         </div>
//                       </div>
//                     </td>
//                   </tr>
//                 </tbody>
//               </Table>
//             </Card>
//           </Col>
//         </Row>
//       </Container> */}
//     </>
//   );
// };

// export default EmployeeIndex;

import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

import Header from "components/Headers/Header.js";
import AllSchedule from "./examples/AllSchedule";
const userData = JSON.parse(localStorage.getItem("user"));
const EmployeeIndex = (props) => {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/v1/schedule/all-schedules",
          {
            withCredentials: true,
          }
        );
        console.log(userData);
        const result = response.data.data;
        console.log(result);
        const yourData = result.filter(
          (data) => data.interviewer._id === userData._id
        );
        setCandidates(yourData);
      } catch (error) {
        console.error("Error fetching data: ", error);
        // Display toast message or handle error as needed
      }
    };
    fetchData();
  }, []);

  const deleteCandidate = async (e, scheduleId) => {
    e.preventDefault();
    try {
      await axios.delete(
        `http://localhost:4000/api/v1/schedule/delete-schedule/${scheduleId}`,
        {
          withCredentials: true,
        }
      );
      // Display success message using toast
      console.log("Schedule deleted successfully");
      // Reload the page after deletion
      window.location.reload();
    } catch (error) {
      console.error("Error deleting schedule: ", error);
      // Display error message using toast or handle error as needed
    }
  };

  return (
    <>
      <EmployeeHeader />
      <Container className="mt--9" fluid>
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
                            <Link
                              to={`/admin/update-user/${schedule.interviewer._id}`}
                              className="text-white"
                            >
                              {schedule.interviewer.firstName}{" "}
                              {schedule.interviewer.lastName}
                            </Link>
                          </span>
                        </Media>
                      </th>
                      <td>
                        {new Date(schedule.dateTime).toLocaleDateString()}
                      </td>
                      <td>
                        {new Date(schedule.dateTime).toLocaleTimeString()}
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

export default EmployeeIndex;
