// import React, { useEffect, useState } from "react";
// import toast, { Toaster } from "react-hot-toast";
// import {
//   Button,
//   Card,
//   CardHeader,
//   CardBody,
//   FormGroup,
//   Form,
//   Input,
//   Container,
//   Row,
//   Col,
// } from "reactstrap";
// import Multiselect from "multiselect-react-dropdown";
// import EmployeeHeader from "components/Headers/EmployeeHeader";
// import axios from "axios";
// // import { useNavigate } from "react-router-dom";

// const AddSchedule = () => {
//   const [options, setOptions] = useState([]);
//   const [departments, setDepartment] = useState([]);
//   const [candidates, setCandidates] = useState([]);
//   const [round, setRound] = useState([]);
//   const [interviewers, setInterviewers] = useState([]);
//   const [selectedCandidate, setSelectedCandidate] = useState([]);
//   const [filteredInterviewers, setFilteredInterviewers] = useState([]);
//   // const navigates = useNavigate();
//   useEffect(() => {
//     async function fatchData() {
//       try {
//         const response = await axios.get(
//           "http://localhost:4000/api/v1/department/departments"
//         );
//         setOptions(response.data.data);

//         const scheduleResponse = await axios.get(
//           "http://localhost:4000/api/v1/schedule/show-data",
//           { withCredentials: true }
//         );
//         const { populatedCandidates = [], populatedInterViewer = [] } =
//           scheduleResponse.data.data;

//         setCandidates(populatedCandidates);
//         setInterviewers(populatedInterViewer);
//       } catch (error) {
//         throw new Error(error.message);
//       }
//     }
//     fatchData();
//   }, []);

//   const handelAdd = (departmentName) => {
//     const machingDepartments = options.filter((option) =>
//       departmentName.includes(option.nameOfDepartment)
//     );
//     if (machingDepartments) {
//       setDepartment(machingDepartments.map((departmentId) => departmentId._id));
//     }
//   };
//   const handelRemoveD = (remove) => {
//     setDepartment(departments.filter((d) => d !== remove));
//   };
//   console.log(selectedCandidate);

//   // ? change
//   const handleCandidateSelect = (selectedList) => {
//     const selectedCandidateName = selectedList[0];
//     const candidate = candidates.find(
//       (candidate) => candidate.firstName === selectedCandidateName
//     );

//     if (candidate) {
//       const candidateDepartments = candidate.departments.map((dep) => dep._id);
//       const matchingInterviewers = interviewers.filter((interviewer) =>
//         interviewer.departments.some((dep) =>
//           candidateDepartments.includes(dep._id)
//         )
//       );
//       setFilteredInterviewers(matchingInterviewers);
//     } else {
//       setFilteredInterviewers([]);
//     }
//   };
//   const handleCandidateRemove = () => {
//     setFilteredInterviewers([]);
//   };
//   return (
//     <>
//       <div>
//         <Toaster position="top-center" reverseOrder={false} />
//       </div>
//       <EmployeeHeader />
//       <Container className="mt--7" fluid>
//         <Card className="bg-secondary shadow">
//           <CardHeader className="bg-white border-0">
//             <Row className="align-items-center">
//               <Col xs="8">
//                 <h3 className="mb-0">Create Schdule</h3>
//               </Col>
//               <Col className="text-right" xs="4">
//                 <Button
//                   color="primary"
//                   href="#pablo"
//                   // onClick={(e) => AddCandidate(e)}
//                   size="medium"
//                 >
//                   Create
//                 </Button>
//               </Col>
//             </Row>
//           </CardHeader>
//           <CardBody>
//             <Form>
//               <h6 className="heading-small text-muted mb-4">Schdule Info</h6>
//               <div className="pl-lg-4">
//                 <Row>
//                   <Col md="6">
//                     <FormGroup>
//                       <label
//                         className="form-control-label"
//                         htmlFor="input-password"
//                       >
//                         Select Department
//                       </label>
//                       <Multiselect
//                         className="form-control-alternative bg-white"
//                         isObject={false}
//                         onKeyPressFn={function noRefCheck() {}}
//                         onRemove={handelRemoveD}
//                         onSearch={function noRefCheck() {}}
//                         onSelect={handelAdd}
//                         options={options.map(
//                           (departmentName) => departmentName.nameOfDepartment
//                         )}
//                         placeholder="Select Department"
//                         // onChange={(e) => setFirstname(e.target.value)}
//                       />
//                     </FormGroup>
//                   </Col>
//                   <Col md="6">
//                     <FormGroup>
//                       <label
//                         className="form-control-label"
//                         htmlFor="input-password"
//                       >
//                         Select Candidate
//                       </label>
//                       <Multiselect
//                         className="form-control-alternative bg-white"
//                         isObject={false}
//                         onKeyPressFn={function noRefCheck() {}}
//                         // onRemove={function noRefCheck() {}}
//                         onSearch={function noRefCheck() {}}
//                         // onSelect={function noRefCheck(e) {
//                         //   handleCandidateSelect(e);
//                         // }}
//                         onRemove={handleCandidateRemove}
//                         onSelect={handleCandidateSelect}
//                         singleSelect="true"
//                         options={candidates.map(
//                           (candidate) =>
//                             candidate.Firstname + " " + candidate.Lastname
//                         )}
//                         placeholder="Select Candidate"
//                       />
//                     </FormGroup>
//                   </Col>
//                 </Row>
//                 <Row>
//                   <Col lg="6">
//                     <FormGroup>
//                       <label
//                         className="form-control-label"
//                         htmlFor="input-number"
//                       >
//                         Select Date And Time of Interview
//                       </label>
//                       <Input
//                         className="form-control-alternative"
//                         id="input-number"
//                         placeholder="DoB"
//                         type="datetime-local"
//                         // onChange={(e) => setDob(e.target.value)}
//                       />
//                     </FormGroup>
//                   </Col>
//                   <Col md="6">
//                     <FormGroup>
//                       <label
//                         className="form-control-label"
//                         htmlFor="input-password"
//                       >
//                         Select Interviewer
//                       </label>
//                       <Multiselect
//                         className="form-control-alternative bg-white"
//                         isObject={false}
//                         onKeyPressFn={function noRefCheck() {}}
//                         onRemove={function noRefCheck() {}}
//                         onSearch={function noRefCheck() {}}
//                         onSelect={function noRefCheck(e) {
//                           // setWorkLocation(e.at(0));
//                         }}
//                         singleSelect="true"
//                         // options={interviewers.map(
//                         //   (interviewer) =>
//                         //     interviewer.firstName + " " + interviewer.lastName
//                         // )}
//                         options={filteredInterviewers.map(
//                           (interviewer) => interviewer.firstName
//                         )}
//                         placeholder="Select Interviewer"
//                       />
//                     </FormGroup>
//                   </Col>
//                   <Col md="6">
//                     <FormGroup>
//                       <label
//                         className="form-control-label"
//                         htmlFor="input-education"
//                       >
//                         Interview round
//                       </label>
//                       <Multiselect
//                         className="form-control-alternative bg-white "
//                         isObject={false}
//                         onKeyPressFn={function noRefCheck() {}}
//                         onRemove={function noRefCheck() {}}
//                         onSearch={function noRefCheck() {}}
//                         onSelect={function noRefCheck(e) {
//                           setRound(e.at(0));
//                         }}
//                         singleSelect="true"
//                         options={["1", "2", "3"]}
//                         placeholder="Select round"
//                       />
//                     </FormGroup>
//                   </Col>
//                 </Row>
//               </div>
//             </Form>
//           </CardBody>
//         </Card>
//       </Container>
//     </>
//   );
// };

// export default AddSchedule;
