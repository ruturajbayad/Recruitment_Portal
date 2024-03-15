import { useState } from "react";
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
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const forgotPassWord = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:4000/api/v1/users/forgot-Password", {
        email,
      })
      .then((response) => {
        if (response.data.statusCode === 200) {
          toast.success("Email sent successfully");
          navigate("/auth/login");
        } else if (response.data.statusCode === 404) {
          alert("Email not found");
        }
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST")
          alert("User not found: " + err.message);
      });
  };

  return (
    <>
      <Toaster />
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-2">
            <div className="text-muted text-center mt-1 mb-1">
              <h1>Forgot Password</h1>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-1">
            <div className="text-center text-muted mb-4">
              <small>Enter your email and Chek inbox</small>
            </div>
            <Form role="form" onSubmit={(e) => forgotPassWord(e)}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                  />
                </InputGroup>
              </FormGroup>
              <div className="text-center">
                <Button className="my-3" color="primary" type="submit">
                  Sent
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

export default ForgotPassword;
