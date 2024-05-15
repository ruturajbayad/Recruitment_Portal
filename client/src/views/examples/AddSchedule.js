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
  const [options, setOptions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [round, setRound] = useState([]);
  const [interviewers, setInterviewers] = useState([]);
  const [filteredInterviewers, setFilteredInterviewers] = useState([]);
  const [scheduleInfo, setScheduleInfo] = useState({
    candidateID: "",
    interviewer: "",
    round: "",
    dateTime: "",
  });

  // Fetch data on mount
  useEffect(() => {
    async function fetchData() {
      try {
        const departmentResponse = await axios.get(
          "http://localhost:4000/api/v1/department/departments"
        );
        setOptions(departmentResponse.data.data);

        const scheduleResponse = await axios.get(
          "http://localhost:4000/api/v1/schedule/show-data",
          { withCredentials: true }
        );
        const { populatedCandidates = [], populatedInterViewer = [] } =
          scheduleResponse.data.data;

        setCandidates(populatedCandidates);
        setInterviewers(populatedInterViewer);
      } catch (error) {
        toast.error(error.message);
      }
    }
    fetchData();
  }, []);

  const handleCreateSchedule = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/schedule/create-schedule",
        scheduleInfo,
        {
          withCredentials: true,
        }
      );
      toast.success(response.data.message);
      window.location.reload();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Handle selecting a candidate
  const handleCandidateSelect = (selectedList) => {
    const selectedCandidateName = selectedList[0];
    const candidate = candidates.find(
      (candidate) =>
        candidate.Firstname + " " + candidate.Lastname === selectedCandidateName
    );

    if (candidate) {
      const candidateDepartments = candidate.departments.map((dep) => dep._id);
      const matchingInterviewers = interviewers.filter((interviewer) =>
        interviewer.departments.some((dep) =>
          candidateDepartments.includes(dep._id)
        )
      );
      setFilteredInterviewers(matchingInterviewers);

      // Update scheduleInfo with candidate ID
      setScheduleInfo((prevInfo) => ({
        ...prevInfo,
        candidateID: candidate._id,
      }));
    } else {
      setFilteredInterviewers([]);
    }
  };

  // Handle removing a candidate
  const handleCandidateRemove = () => {
    setFilteredInterviewers([]);
    // Reset candidate ID in scheduleInfo
    setScheduleInfo((prevInfo) => ({
      ...prevInfo,
      candidateID: "",
    }));
  };

  // Handle selecting an interviewer
  const handleInterviewerSelect = (selectedList) => {
    const selectedInterviewerName = selectedList[0];
    const interviewer = interviewers.find(
      (interviewer) =>
        interviewer.firstName + " " + interviewer.lastName ===
        selectedInterviewerName
    );

    if (interviewer) {
      // Update scheduleInfo with interviewer ID
      setScheduleInfo((prevInfo) => ({
        ...prevInfo,
        interviewer: interviewer._id,
      }));
    }
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
                <h3 className="mb-0">Create Schedule</h3>
              </Col>
              <Col className="text-right" xs="4">
                <Button
                  color="primary"
                  onClick={handleCreateSchedule}
                  size="medium"
                >
                  Create
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form>
              <h6 className="heading-small text-muted mb-4">Schedule Info</h6>
              <div className="pl-lg-4">
                <Row>
                  <Col md="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-candidate"
                      >
                        Select Candidate
                      </label>
                      <Multiselect
                        className="form-control-alternative bg-white"
                        isObject={false}
                        onKeyPressFn={() => {}}
                        onSearch={() => {}}
                        onSelect={handleCandidateSelect}
                        onRemove={handleCandidateRemove}
                        singleSelect={true}
                        options={candidates.map(
                          (candidate) =>
                            candidate.Firstname + " " + candidate.Lastname
                        )}
                        placeholder="Select Candidate"
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-interviewer"
                      >
                        Select Interviewer
                      </label>
                      <Multiselect
                        className="form-control-alternative bg-white"
                        isObject={false}
                        onKeyPressFn={() => {}}
                        onSearch={() => {}}
                        onSelect={handleInterviewerSelect}
                        singleSelect={true}
                        options={filteredInterviewers.map(
                          (interviewer) =>
                            interviewer.firstName + " " + interviewer.lastName
                        )}
                        placeholder="Select Interviewer"
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col lg="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-datetime"
                      >
                        Select Date And Time of Interview
                      </label>
                      <Input
                        className="form-control-alternative"
                        id="input-datetime"
                        placeholder="Date and Time"
                        type="datetime-local"
                        onChange={(e) =>
                          setScheduleInfo((prevInfo) => ({
                            ...prevInfo,
                            dateTime: e.target.value,
                          }))
                        }
                      />
                    </FormGroup>
                  </Col>
                  <Col md="6">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-round"
                      >
                        Interview Round
                      </label>
                      <Multiselect
                        className="form-control-alternative bg-white"
                        isObject={false}
                        onKeyPressFn={() => {}}
                        onSearch={() => {}}
                        onSelect={(selectedList) =>
                          setScheduleInfo((prevInfo) => ({
                            ...prevInfo,
                            round: selectedList[0],
                          }))
                        }
                        singleSelect={true}
                        options={["1", "2", "3"]}
                        placeholder="Select Round"
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
