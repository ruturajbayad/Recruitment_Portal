import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const [newPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const { id, token } = useParams();

  const resetPassword = async (e) => {
    if (!(newPassword === confirmPassword)) {
      setTimeout(() => toast.error("Please enter a correct password"), 5000);
      window.location.reload();
    }
    e.preventDefault();
    await axios
      .post(
        `http://localhost:4000/api/v1/users/reset-password/${id}/${token}`,
        {
          newPassword,
        }
      )
      .then((response) => {
        if (response.data.statusCode === 200) {
          toast.success("Password reset successful ✔");
          navigate("/auth/login");
        }
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") toast.error("Link is expired");
      });
  };

  return (
    <>
      <div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-2">
            <div className="text-muted text-center mt-1 mb-1">
              <h1>Reset Your Password</h1>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-1">
            <div className="text-center text-muted mb-4">
              <small>Enter New Password</small>
            </div>
            <Form role="form" onSubmit={(e) => resetPassword(e)}>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    autoComplete="new-password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-3" color="primary" type="submit">
                  Reset
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-4">
          <Col xs="6"></Col>
        </Row>
      </Col>
    </>
  );
};

export default ResetPassword;
